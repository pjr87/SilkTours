import datetime
from interests_mapped import Interests
from ratings_mapped import Rating
from stop_mapped import Stop
from tour_guide_mapped import TourGuides
from sqlalchemy import Column, Integer, Float, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base
from db_session import session, commitSession, createSession


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
    ratings = relationship("Rating")
    stops = relationship("Stop")
    interests = relationship("Interests", foreign_keys="Interests.id_tour")
    guides = relationship("TourGuides", foreign_keys="TourGuides.id_tour")
    language = Column(String)

    def set_props(self, data):
        for key in data:
            print(key)
            if key not in ["ratings", "stops", "interests", "guides"]:
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
                    TourGuides.create(item, self.id_tour)
                # self.guides = [TourGuides.create(item, self.id_tour) for item in data[key]]

    def createOrEdit(self, data):
        self.set_props(data)
        commitSession(self)
        self.create_extras(data)
        commitSession(self)

    def serialize(self, deep):
        result = {}

        for c in self.__table__.columns:
            key = c.name
            value = getattr(self, c.name)
            if type(value) is datetime.date:
                value = str(value)
            result[key] = value

        result["stops"] = []
        for stop in self.stops:
            result["stops"].append(stop.serialize())

        result["interests"] = []
        for interest in self.interests:
            result["interests"].append(interest.serialize())

        result["guides"] = []
        for guide in self.guides:
            result["guides"].append(guide.serialize())

        result["ratings"] = []
        for rating in self.ratings:
            result["ratings"].append(rating.serialize())
        return result
