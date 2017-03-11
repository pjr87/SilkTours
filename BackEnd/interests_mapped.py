from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base
from db_session import commitSession, session


class Interests(Base):
    __tablename__ = 'InterestList'
    VISABLE_PROPS = ["name", "id_interestList"]

    id_interestList = Column(Integer, primary_key=True)
    name = Column(String)
    #id_interest = Column(Integer, ForeignKey("address.id"))
    id_tour = Column(Integer, ForeignKey("Tour.id_tour"))

    id_user = Column(Integer, ForeignKey("User.id_users"))

    def set_props(self, data):
        for key in data:
            setattr(self, key, data[key])

    def create(data, id_tour=None, id_user=None):
        result = None
        if "id_interestList" in data:
            result = session.query(Interests).get(data["id_interestList"])
        if result is None:
            result = Interests()
        result.set_props(data)
        if id_tour is not None:
            result.id_tour = id_tour
        if id_user is not None:
            result.id_user = id_user
        commitSession(result)
        return result

    def serialize(self):
        return {
            "name": self.name,
            "id_interestList": self.id_interestList
        }

    def getByUser(self, user):
        user.props["interests"] = []
        response = Interests.client.get_item(
            Key={
                'il_userID': user.props["id"]
            }
        )

        for i in response['Items']:
            interest = {}
            interest["name"] = i["il_name"]
            interest["il_id"] = i["il_id"]
            interest["i_id"] = i["i_id"]
            user.props["interests"].append(interest)

    def getByTour():
        pass
