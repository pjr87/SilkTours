import boto3
import uuid
from interests import Interests


class User:
    # A set of all properties
    PROPS = {"name", "profilePicture", "intrests", "location", "tours_taking",
             "tours_completed", "phone", "description", "dob", "password",
             "id"}

    # A set of properties required to create a new user
    REQUIRED_PROPS = {"name", "description"}  # TODO Determine required props

    # A set of properties visible to consumer of the API
    VISABLE_PROPS = {"name", "profilePicture", "location", "phone",
                     "description", "dob", "address", "city", "country",
                     "zip", "id"}

    def __init__(self):
        self.props = {}
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table('User')
        self.changed = set()

    def getById(self, id):
        response = self.table.get_item(
            Key={
                'u_id': id
            }
        )

        if "Item" not in response:
            return
        self.parseResponse(response)
        # Interests().getByUser(self)

    def parseResponse(self, response):
        if "Item" not in response:
            return

        response = response["Item"]
        for item in response:
            item_local = item[2:]
            if item_local in User.VISABLE_PROPS:
                self.props[item_local] = response[item]

    def create(self, props):
        for prop in User.REQUIRED_PROPS:
            if prop not in props:
                raise Exception('Missing property: ' + prop)
                return
        self.setProps(props)
        response = self.table.put_item(
            Item=self.prepareProps()
        )
        if "Item" in response:
            self.parseResponse(response["Item"])

    def prepareProps(self):
        result = {}
        visableProps = set(self.props.keys()) & User.VISABLE_PROPS
        for prop in visableProps:
            result["u_" + prop] = self.props[prop]
        result["u_id"] = uuid.uuid4().hex
        return result

    def setProps(self, props):
        for key in props:
            if key not in User.VISABLE_PROPS:
                raise Exception('Invalid property: ' + key)
            if key not in self.props or (self.props[key] != props[key]):
                self.props[key] = props[key]
                self.changed.add(key)

    def delete(self, id):
        # marks as delete rather than deleting
        pass

    def serialize(self):
        return self.props

    def commit(self):
        if len(self.changed) == 0:
            return

        updateExpression = "SET "
        attributeValues = {}
        for changedItem in self.changed:
            updateExpression += "u_" + changedItem + " = :" + changedItem + ','
            attributeValues[':'+changedItem] = self.props[changedItem]
        updateExpression = updateExpression[:-1]

        self.table.update_item(
            Key={'u_id': self.props["id"]},
            UpdateExpression=updateExpression,
            ExpressionAttributeValues=attributeValues
        )
        self.changed = set()
