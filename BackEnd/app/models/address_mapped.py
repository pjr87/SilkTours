# from interests import Interests
from sqlalchemy import Column, Integer, String
from base import Base
from db_session import get_session, commitSession, createSession


class Address(Base):
    __tablename__ = 'Address'
    id_address = Column(Integer, primary_key=True)
    city = Column(String)
    country = Column(String)
    street = Column(String)
    unit = Column(String)
    zip = Column(String)
    state_code = Column(String)

    def serialize(self):
        return {
            "city": self.city,
            "country": self.country,
            "street": self.street,
            "unit": self.unit,
            "zip": self.zip,
            "state_code": self.state_code
        }

    def create(data):
        result = None
        if "id_address" in data:
            result = get_session().query(Address).get(data["id_address"])
        if result is None:
            result = Address()
        result.setProps(data)
        return result

    def setProps(self, data):
        for key in data:
            setattr(self, key, data[key])
        createSession()
        get_session().add(self)
        commitSession()
