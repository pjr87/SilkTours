import datetime
from interests_mapped import Interests
from ratings_mapped import Rating
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


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
    address_zip = Column(String)
    address_street = Column(String)
    address_suffix = Column(String)
    address_unit = Column(String)
    address_unit_number = Column(String)
    address_city = Column(String)
    address_country = Column(String)
    profile_image = Column(String)
    id_guide = Column(Integer, ForeignKey("User.id_users"))
    is_deleted = Column(Boolean)
    additional_accomadation = Column(String)
    additional_food = Column(String)
    additional_transport = Column(String)
    id_rating = Column(Integer)
    average_rating = Column(Float)
    rating_count = Column(Integer)
    ratings = relationship("Rating")
    interests = relationship("Interests", foreign_keys="Interests.id_tour")

    def serialize(self, deep):
        result = {}

        for c in self.__table__.columns:
            key = c.name
            value = getattr(self, c.name)
            if type(value) is datetime.date:
                value = str(value)
            result[key] = value
        return result
