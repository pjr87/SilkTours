from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class Interests(Base):
    __tablename__ = 'InterestList'

    id_interestList = Column(Integer, primary_key=True)
    name = Column(String)
    #id_interest = Column(Integer, ForeignKey("address.id"))
<<<<<<< HEAD
    #id_tour = Column(Integer, ForeignKey("address.id"))
=======
    id_tour = Column(Integer, ForeignKey("Tour.id_tour"))
>>>>>>> master
    id_user = Column(Integer, ForeignKey("User.id_users"))

    def serialize(self):
        return {
            "name": self.name,
            "id_interestList": self.id_interestList
        }

    def getByUser(self, user):
        print user.props
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
