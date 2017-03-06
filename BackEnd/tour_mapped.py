import datetime
from interests_mapped import Interests
from ratings_mapped import Rating
from stop_mapped import Stop
from tour_guide_mapped import TourGuides
from sqlalchemy import Column, Integer, Float, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class Tour(Base):
    __tablename__ = 'Tour'
    id_tour = Column(Integer, primary_key=True)
    firstStart_date = Column(Date)
    lastEnd_date = Column(Date)
    name = Column(String)
    price = Column(Float)
    description = Column(String)
    min_group_size = Column(Integer)
    max_group_size = Column(Integer)
    profile_image = Column(String)
    profile_image_width = Column(Integer)
    profile_image_height = Column(Integer)
    is_deleted = Column(Boolean)
    additional_accomadation = Column(String)
    additional_food = Column(String)
    additional_transport = Column(String)
    id_rating = Column(Integer)
    average_rating = Column(Float)
    rating_count = Column(Integer)
    ratings = relationship("Rating")
    stops = relationship("Stop")
    interests = relationship("Interests", foreign_keys="Interests.id_tour")
    guides = relationship("TourGuides", foreign_keys="TourGuides.id_tour")

    def serialize(self, deep):
        result = {}

        for c in self.__table__.columns:
            key = c.name
            value = getattr(self, c.name)
            if type(value) is datetime.date:
                value = str(value)
            result[key] = value

        result["stops"] = []
        for stop in self.stops:
            result["stops"].append(stop.serialize())

        result["guides"] = []
        for guide in self.guides:
            result["guides"].append(guide.serialize())
        return result
