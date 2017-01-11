import datetime
from interests_mapped import Interests
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Boolean
from sqlalchemy.orm import relationship
from base import Base


class User(Base):
    __tablename__ = 'User'
    id_users = Column(Integer, primary_key=True)
    address_city = Column(String)
