import datetime
from interests_mapped import Interests
from tour_mapped import Tour
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base
from db_session import commitSession, session


class TourEvent(Base):
    __tablename__ = 'TourEvent'
    id_tourEvent = Column(Integer, primary_key=True)
    id_guide = Column(Integer, ForeignKey("User.id_users"))
    id_user = Column(Integer, ForeignKey("User.id_users"))
    id_tour = Column(Integer, ForeignKey("Tour.id_tour"))
    #id_rating = Column(Integer, ForeignKey("Ratings.id_rating"))
    tour = relationship("Tour", foreign_keys=[id_tour])
    start_date_time = Column(DateTime)
    end_date_time = Column(DateTime)
    state = Column(String)

    # TODO parse datetime strings before setting
    def set_props(self, data):
        for key in data:
            setattr(self, key, data[key])

    def create(data, id_tour=None, id_user=None):
        result = None
        if "id_tourEvent" in data:
            result = session.query(TourEvent).get(data["id_tourEvent"])
        if result is None:
            result = TourEvent()
        result.set_props(data)
        if id_tour is not None:
            result.id_tour = id_tour
        if id_user is not None:
            result.id_user = id_user
        commitSession(result)
        return result

    def serialize(self):
        start_date_time = None
        if self.start_date_time is not None:
            start_date_time = str(self.start_date_time)

        end_date_time = None
        if self.end_date_time is not None:
            end_date_time = str(self.end_date_time)

        return {
            "id_tourEvent": self.id_tourEvent,
            # "tour": self.tour.serialize(False),
            "id_tour": self.id_tour,
            "start_date_time": start_date_time,
            "end_date_time": end_date_time,
            "state": self.state
        }
