import datetime
from sqlalchemy import Column, Integer, ForeignKey, Time, Date
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
    start_date = Column(Date)
    end_date = Column(Date)
    # tour = relationship("Tour", foreign_keys=[id_tour])

    def set_props(self, id_tour, day_of_week, open_time, close_time, start_date, end_date):
        self.id_tour = id_tour
        self.day_of_week = day_of_week
        self.open_time = open_time
        self.close_time = close_time
        self.start_date = start_date
        self.end_date = end_date
        self.tour_hours_id = None

    def create(data, id_tour=None, create=False):
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
            data.get("start_date"),
            data.get("end_date"))
        if id_tour is not None:
            result.id_tour = id_tour
        if create:
            commitSession(result)
        return result

    def serialize(self):
        return {
            "tour_hours_id": self.tour_hours_id,
            "day_of_week": self.day_of_week,
            "open_time": str(self.open_time),
            "close_time": str(self.close_time),
            "start_date": str(self.start_date),
            "end_date": str(self.end_date)
        }
