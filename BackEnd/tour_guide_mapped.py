from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class TourGuides(Base):
    __tablename__ = 'TourGuides'
    id_tour_guide = Column(Integer, primary_key=True)
    id_user = Column(Integer, ForeignKey("User.id_users"))
    user = relationship("User", foreign_keys=[id_user])

    id_tour = Column(Integer, ForeignKey("Tour.id_tour"))
    tour = relationship("Tour", foreign_keys=[id_tour])

    def serialize(self):
        return {
            "id_user": self.id_user,
            "id_tour": self.id_tour,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name
        }
