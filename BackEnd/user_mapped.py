# from interests import Interests
import datetime
from interests_mapped import Interests
from tour_event_mapped import TourEvent
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Boolean
from sqlalchemy.orm import relationship
from base import Base


class User(Base):
    __tablename__ = 'User'
    id_users = Column(Integer, primary_key=True)
    address_city = Column(String)
    address_country = Column(String)
    address_number = Column(String)
    address_street = Column(String)
    address_suffix = Column(String)
    address_unit = Column(String)
    address_unit_number = Column(String)
    address_zip = Column(String)
    description = Column(String)
    dob = Column(Date)
    first_name = Column(String)
    is_deleted = Column(Boolean)
    is_guide = Column(Boolean)
    last_name = Column(String)
    password_hash = Column(String)
    phone_number = Column(String)
    profile_picture = Column(String)
    reg_date = Column(Date)

    interests = relationship("Interests", foreign_keys="Interests.id_user")
    tours_teaching = relationship("TourEvent", foreign_keys="TourEvent.id_guide")
    tours_taking = relationship("TourEvent", foreign_keys="TourEvent.id_user")

    # A set of all properties
    PROPS = {"name", "profilePicture", "intrests", "location", "tours_taking",
             "tours_completed", "phone", "description", "dob", "password",
             "id"}

    # A set of properties required to create a new user
    REQUIRED_PROPS = {"first_name", "last_name", "description"}

    # A set of properties visible to consumer of the API
    VISABLE_PROPS = {"first_name", "last_name", "address_number",
                     "address_street", "address_suffix", "address_unit",
                     "address_unit_number", "address_city", "address_country",
                     "address_zip", "description", "dob", "is_guide",
                     "id_users", "phone_number", "profile_picture"}

    def set_props(self, data):
        for key in data:
            setattr(self, key, data[key])

    def serialize(self):
        print self.interests
        result = {}

        result["interests"] = []
        for interest in self.interests:
            result["interests"].append(interest.serialize())

        result["tours_teaching"] = []
        for tourEvent in self.tours_teaching:
            result["tours_teaching"].append(tourEvent.serialize())

        result["tours_taking"] = []
        for tourEvent in self.tours_taking:
            result["tours_taking"].append(tourEvent.serialize())

        for c in self.__table__.columns:
            key = c.name
            if key in User.VISABLE_PROPS:
                value = getattr(self, c.name)
                if type(value) is datetime.date:
                    value = str(value)
                result[key] = value
        return result
