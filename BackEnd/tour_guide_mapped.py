from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from base import Base
from db_session import session, commitSession, createSession


class TourGuides(Base):
    __tablename__ = 'TourGuides'
    id_tour_guide = Column(Integer, primary_key=True)
    id_user = Column(Integer, ForeignKey("User.id_users"))
    user = relationship("User", foreign_keys=[id_user])

    id_tour = Column(Integer, ForeignKey("Tour.id_tour"))
    tour = relationship("Tour", foreign_keys=[id_tour])

    def set_props(self, data):
        for key in data:
            setattr(self, key, data[key])

    def create(data, id_tour=None):
        result = None
        if "id_tour_guide" in data:
            result = session.query(TourGuides).get(data["id_tour_guide"])
        if result is None:
            result = TourGuides()
        result.set_props(data)
        if id_tour is not None:
            result.id_tour = id_tour
        commitSession(result)
        return result

    def serialize(self):
        return {
            "id_user": self.id_user,
            "id_tour": self.id_tour,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "id_tour_guide": self.id_tour_guide
        }
