from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class FavoritesClass(Base):
    __tablename__ = 'Favorites'
    favorite_id = Column(Integer, primary_key=True)
    tour_id = Column(Integer, ForeignKey("Tour.id_tour"))
    user_id = Column(Integer, ForeignKey("User.id_users"))
    tour = relationship("Tour", foreign_keys=[tour_id])
