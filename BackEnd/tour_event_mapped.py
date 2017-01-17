import datetime
from interests_mapped import Interests
from tour_mapped import Tour
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class TourEvent(Base):
    __tablename__ = 'TourEvent'
    id_tourEvent = Column(Integer, primary_key=True)
    id_guide = Column(Integer, ForeignKey("User.id_users"))
    id_user = Column(Integer, ForeignKey("User.id_users"))
    id_tour = Column(Integer, ForeignKey("Tour.id_tour"))
    #id_rating = Column(Integer, ForeignKey("Ratings.id_rating"))
    tour = relationship("Tour", foreign_keys=[id_tour])

    def serialize(self):
        print self.tour
        return {
            "id_tourEvent": self.id_tourEvent,
            "tour": self.tour.serialize(False)
        }
