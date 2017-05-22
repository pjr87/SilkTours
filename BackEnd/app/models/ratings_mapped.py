import datetime
from app.models.interests_mapped import Interests
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class Rating(Base):
    __tablename__ = 'Rating'
    id_rating = Column(Integer, primary_key=True)
    comments = Column(String)
    date_time_created = Column(DateTime)
    rate = Column(Integer)
    id_tour = Column(Integer, ForeignKey("Tour.id_tour"))
    id_user = Column(Integer, ForeignKey("User.id_users"))
    is_deleted = Column(Boolean)
    tour = relationship("Tour", foreign_keys=[id_tour])

    def set_props(self, rating, comment, id_tour, id_user):
        self.rate = rating
        self.id_tour = id_tour
        self.id_user = id_user
        # TODO update tour and/or user with new average rating
        self.comments = comment
        self.date_time_created = datetime.datetime.now()
        self.id_rating = None

    def serialize(self):
        result = {}

        for c in self.__table__.columns:
            key = c.name
            value = getattr(self, c.name)
            if type(value) is datetime.date:
                value = str(value)
            result[key] = value
        return result
