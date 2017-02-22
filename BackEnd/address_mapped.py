# from interests import Interests
from sqlalchemy import Column, Integer, String
from base import Base
from db_session import session, commitSession, createSession


class Address(Base):
    __tablename__ = 'Address'
    id_address = Column(Integer, primary_key=True)
    city = Column(String)
    country = Column(String)
    number = Column(String)
    street = Column(String)
    suffix = Column(String)
    unit = Column(String)
    unit_number = Column(String)
    zip = Column(String)
    state_code = Column(String)

    def serialize(self):
        return {
            "city": self.city,
            "country": self.country,
            "number": self.number,
            "street": self.street,
            "suffix": self.suffix,
            "unit": self.unit,
            "unit_number": self.unit_number,
            "zip": self.zip,
            "state_code": self.state_code
        }

    def create(data):
        result = Address()
        result.setProps(data)
        return result

    def setProps(self, data):
        for key in data:
            setattr(self, key, data[key])
        createSession()
        session.add(self)
        commitSession()
