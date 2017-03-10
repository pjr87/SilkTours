import datetime
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from base import Base
from db_session import session, commitSession


class Stop(Base):
    __tablename__ = 'Stop'
    id_stop = Column(Integer, primary_key=True)
    id_tour = Column(Integer, ForeignKey("Tour.id_tour"))
    lat = Column(Integer)
    lon = Column(Integer)
    tour = relationship("Tour", foreign_keys=[id_tour])

    def set_props(self, id_tour, lat, lon):
        self.id_tour = id_tour
        self.lat = lat
        self.lon = lon
        self.id_stop = None

    def create(data, id_tour=None):
        result = session.query(Stop).get(data["id_stop"])
        if result is None:
            result = Stop()
        result.set_props(data.get("id_tour"), data.get("lat"), data.get("lon"))
        if id_tour is not None:
            result.id_tour = id_tour
        commitSession(result)
        return result

    def serialize(self):
        return {
            "id_stop": self.id_stop,
            "lat": self.lat,
            "lon": self.lon
        }
