# from interests import Interests
import datetime
from app.models.address_mapped import Address
from app.models.interests_mapped import Interests
from app.models.tour_event_mapped import TourEvent
from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base
from db_session import commitSession
import boto3


class User(Base):
    __tablename__ = 'User'
    id_users = Column(Integer, primary_key=True)
    description = Column(String)
    dob = Column(Date)
    first_name = Column(String)
    is_deleted = Column(Boolean)
    last_name = Column(String)
    password_hash = Column(String)
    phone_number = Column(String)
    profile_picture = Column(String)
    reg_date = Column(Date)
    email = Column(String)
    accessKeyId = Column(String)
    is_guide = Column(Boolean)
    secretAccessKey = None

    address_id = Column(Integer, ForeignKey("Address.id_address"))
    address = relationship("Address", foreign_keys=[address_id])

    interests = relationship("Interests")
    interests = relationship("Interests", foreign_keys="Interests.id_user")
    tours_teaching = relationship("TourEvent", foreign_keys="TourEvent.id_guide")
    tours_taking = relationship("TourEvent", foreign_keys="TourEvent.id_user")

    # A set of all properties
    PROPS = {"name", "profilePicture", "intrests", "location", "tours_taking",
             "tours_completed", "phone", "description", "dob", "password",
             "id", "email", "accessKeyID", "secritAccessKey"}

    # A set of properties required to create a new user
    REQUIRED_PROPS = {"first_name", "last_name", "description", "email"}

    # A set of properties visible to consumer of the API
    VISABLE_PROPS = {"first_name", "last_name", "address_number",
                     "description", "dob", "is_guide",
                     "id_users", "phone_number", "profile_picture", "email"}

    def set_props(self, data):
        for key in data:
            print(key)
            if key not in ["tours_taking", "tours_teaching", "interests", "address"]:
                print("setting")
                setattr(self, key, data[key])
            elif key == "address":
                print("creatingAddress")
                if self.address_id is None:
                    self.address = Address.create(data[key])
                    self.address_id = self.address.id_address
                else:
                    self.address.setProps(data[key])

    def create_extras(self, data):
        for key in data:
            if key == "interests":
                for item in data[key]:
                    Interests.create(item, id_user=self.id_users)
                # self.interests = [Interests.create(item, id_user=self.id_users) for item in data[key]]
            elif key == "tours_taking":
                for item in data[key]:
                    TourEvent.create(item, id_user=self.id_users)
                # self.tours_taking = [TourEvent.create(item, id_user=self.id_users) for item in data[key]]
            elif key == "tours_teaching":
                for item in data[key]:
                    TourEvent.create(item, id_user=self.id_users)
                # self.tours_teaching = [TourEvent.create(item, id_user=self.id_users) for item in data[key]]

    def create_or_edit(self, data):
        self.set_props(data)
        commitSession(self)
        self.create_extras(data)
        commitSession(self)

    def serialize(self, deep=False):
        result = {}

        result["interests"] = []
        for interest in self.interests:
            result["interests"].append(interest.serialize())

        result["tours_teaching"] = []
        for tourEvent in self.tours_teaching:
            result["tours_teaching"].append(tourEvent.serialize(deep))

        result["tours_taking"] = []
        for tourEvent in self.tours_taking:
            result["tours_taking"].append(tourEvent.serialize(deep))

        if self.address is not None:
            result["address"] = self.address.serialize()
        else:
            result["address"] = None

        for c in self.__table__.columns:
            key = c.name
            if key in User.VISABLE_PROPS:
                value = getattr(self, c.name)
                if type(value) is datetime.date:
                    value = str(value)
                result[key] = value
        return result

    def upload_to_s3(self, file, filename):
        resource = boto3.resource('s3')
        bucket = resource.Bucket('silktours-media')
        bucket.put_object(Key='user/profile/' + filename, Body=file, GrantRead='uri=http://acs.amazonaws.com/groups/global/AllUsers')

    def upload_profile_image(self, file, userid):
        s = file.filename.split('.')
        extension = s[-1]
        url = 'https://s3.amazonaws.com/silktours-media/' + 'user/profile/' + userid + '.' + extension
        self.upload_to_s3(file, userid + '.' + extension)
        self.profile_picture = url
        commitSession(self)
        return self.serialize()
