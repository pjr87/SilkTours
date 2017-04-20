import datetime
from sqlalchemy import Column, Integer, ForeignKey, Time, Date, Boolean
from sqlalchemy.orm import relationship
from base import Base
from db_session import get_session, commitSession


class TourHoursSpecial(Base):
    __tablename__ = 'TourHoursSpecial'
    tour_hours_special_id = Column(Integer, primary_key=True)
    tour_id = Column(Integer, ForeignKey("Tour.id_tour"))
    date = Column(Date)
    open_time = Column(Time)
    close_time = Column(Time)
    overrides = Column(Boolean)
    # tour = relationship("Tour", foreign_keys=[id_tour])

    def set_props(self, id_tour, date, open_time, close_time, overrides):
        self.id_tour = id_tour
        self.date = date
        self.open_time = open_time
        self.close_time = close_time
        self.overrides = overrides
        self.tour_hours_id = None

    def create(data, id_tour=None):
        result = None
        if "tour_hours_id" in data:
            result = get_session().query(TourHoursSpecial).get(data["tour_hours_special_id"])
        if result is None:
            result = TourHoursSpecial()
        result.set_props(
            data.get("tour_id"),
            data.get("date"),
            data.get("open_time"),
            data.get("close_time"),
            data.get("overrides"))
        if id_tour is not None:
            result.id_tour = id_tour
        commitSession(result)
        return result

    def serialize(self):
        return {
            "tour_hours_special_id": self.tour_hours_special_id,
            "date": str(self.date),
            "open_time": str(self.open_time),
            "close_time": str(self.close_time),
            "overrides": str(self.overrides)
        }
