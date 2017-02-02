from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class Stop(Base):
    __tablename__ = 'Stop'
    id_stop = Column(Integer, primary_key=True)
    tour_id = Column(Integer, ForeignKey("Tour.id_tour"))
    lat = Column(Integer)
    lon = Column(Integer)
    tour = relationship("Tour", foreign_keys=[tour_id])

    def serialize(self):
        return {
            "id_stop": self.id_stop,
            "lat": self.lat,
            "lon": self.lon
        }
