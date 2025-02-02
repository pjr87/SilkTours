import datetime
from app.models.interests_mapped import Interests
from app.models.address_mapped import Address
from app.models.ratings_mapped import Rating
from app.models.stop_mapped import Stop
from app.models.tour_guide_mapped import TourGuidesClass
from sqlalchemy import Column, Integer, Float, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base
from db_session import get_session, commitSession, createSession
import boto3
import uuid


class Tour(Base):
    __tablename__ = 'Tour'
    id_tour = Column(Integer, primary_key=True)
    firstStart_date = Column(Date)
    lastEnd_date = Column(Date)
    name = Column(String)
    price = Column(Float)
    description = Column(String)
    min_group_size = Column(Integer)
    max_group_size = Column(Integer)
    profile_image = Column(String)
    profile_image_width = Column(Integer)
    profile_image_height = Column(Integer)
    is_deleted = Column(Boolean)
    additional_accomadation = Column(String)
    additional_food = Column(String)
    additional_transport = Column(String)
    id_rating = Column(Integer)
    average_rating = Column(Float)
    rating_count = Column(Integer)
    address_id = Column(Integer, ForeignKey("Address.id_address"))
    address = relationship("Address", foreign_keys=[address_id])
    ratings = relationship("Rating")
    stops = relationship("Stop")
    interests = relationship("Interests", foreign_keys="Interests.id_tour")
    guides = relationship("TourGuidesClass", foreign_keys="TourGuidesClass.id_tour")
    events = relationship("TourEvent", foreign_keys="TourEvent.id_tour")
    language = Column(String)
    length = Column(Integer)

    def set_props(self, data):
        for key in data:
            print(key)
            if key not in ["ratings", "stops", "interests", "guides", "address"]:
                print("setting")
                setattr(self, key, data[key])

    def create_extras(self, data):
        for key in data:
            if key == "stops":
                for item in data[key]:
                    Stop.create(item, self.id_tour)
                # self.stops = [Stop.create(item, self.id_tour) for item in data[key]]
            elif key == "interests":
                for item in data[key]:
                    Interests.create(item, self.id_tour)
                # self.interests = [Interests.create(item, self.id_tour) for item in data[key]]
            elif key == "guides":
                for item in data[key]:
                    TourGuidesClass.create(item, self.id_tour)
            elif key == "address":
                address = Address.create(data[key])
                self.address_id = address.id_address
                commitSession(self)
                # self.guides = [TourGuides.create(item, self.id_tour) for item in data[key]]

    def createOrEdit(self, data):
        self.set_props(data)
        commitSession(self)
        self.create_extras(data)
        commitSession(self)

    def serialize(self, deep=True, print_nested=False, print_events=False):
        result = {}

        for c in self.__table__.columns:
            key = c.name
            value = getattr(self, c.name)
            if type(value) is datetime.date:
                value = str(value)
            result[key] = value

        result["guides"] = []
        for guide in self.guides:
            result["guides"].append(guide.serialize())

        if print_events:
            print("self.events")
            print(self.events)
            result["events"] = []
            for event in self.events:
                result["events"].append(event.serialize())

        result["address"] = {}
        if self.address is not None:
            result["address"] = self.address.serialize()

        if not deep:
            return result

        result["stops"] = []
        for stop in self.stops:
            result["stops"].append(stop.serialize())

        result["interests"] = []
        for interest in self.interests:
            result["interests"].append(interest.serialize())

        result["ratings"] = []
        for rating in self.ratings:
            result["ratings"].append(rating.serialize())

        return result


    def upload_to_s3(self, file, filename):
        resource = boto3.resource('s3')
        bucket = resource.Bucket('silktours-media')
        bucket.put_object(Key='tour/profile/' + filename, Body=file, GrantRead='uri=http://acs.amazonaws.com/groups/global/AllUsers')

    def upload_profile_image(self, file, tourid):
        s = file.filename.split('.')
        extension = s[-1]
        url = 'https://s3.amazonaws.com/silktours-media/' + 'tour/profile/' + tourid + '.' + extension
        self.upload_to_s3(file, tourid + '.' + extension)
        self.profile_image = url
        commitSession(self)
        return self.serialize()
