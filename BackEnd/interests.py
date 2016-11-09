import boto3
import uuid
from boto3.dynamodb.conditions import Key, Attr


class Interests:
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('InterestList')

    def getByUser(self, user):
        print user.props
        user.props["interests"] = []
        response = Interests.table.query(
            KeyConditionExpression=Key('il_userID').eq(user.props["id"])
        )
        for i in response['Items']:
            interest = {}
            interest["name"] = i["il_name"]
            interest["il_id"] = i["il_id"]
            interest["i_id"] = i["i_id"]
            user.props["interests"].append(interest)

    def getByTour():
        pass
