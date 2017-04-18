import datetime
from sqlalchemy import Column, Integer, ForeignKey, Time, DateTime
from sqlalchemy.orm import relationship
from base import Base
from db_session import get_session, commitSession


class TourHours(Base):
    __tablename__ = 'TourHours'
    tour_hours_id = Column(Integer, primary_key=True)
    tour_id = Column(Integer, ForeignKey("Tour.id_tour"))
    day_of_week = Column(Integer)
    open_time = Column(Time)
    close_time = Column(Time)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    # tour = relationship("Tour", foreign_keys=[id_tour])

    def set_props(self, id_tour, day_of_week, open_time, close_time, start_time, end_time):
        self.id_tour = id_tour
        self.day_of_week = day_of_week
        self.open_time = open_time
        self.close_time = close_time
        self.start_time = start_time
        self.end_time = end_time
        self.tour_hours_id = None

    def create(data, id_tour=None):
        result = None
        if "tour_hours_id" in data:
            result = get_session().query(TourHours).get(data["tour_hours_id"])
        if result is None:
            result = TourHours()
        result.set_props(
            data.get("tour_id"),
            data.get("day_of_week"),
            data.get("open_time"),
            data.get("close_time"),
            data.get("start_time"),
            data.get("end_time"))
        if id_tour is not None:
            result.id_tour = id_tour
        commitSession(result)
        return result

    def serialize(self):
        return {
            "tour_hours_id": self.tour_hours_id,
            "day_of_week": self.day_of_week,
            "open_time": self.open_time,
            "close_time": self.lon,
            "start_time": self.start_time,
            "end_time": self.end_time
        }
