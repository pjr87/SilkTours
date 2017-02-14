import boto3
import uuid
# from interests import Interests
import MySQLdb
import datetime


class User:
    # A set of all properties
    PROPS = {"name", "profilePicture", "intrests", "location", "tours_taking",
             "tours_completed", "phone", "description", "dob", "password",
             "id"}

    # A set of properties required to create a new user
    REQUIRED_PROPS = {"first_name", "last_name", "description"}

    # A set of properties visible to consumer of the API
    VISABLE_PROPS = {"first_name", "last_name", "address_number",
                     "address_street", "address_suffix", "address_unit",
                     "address_unit_number", "address_city", "address_country",
                     "address_zip", "description", "dob", "is_guide",
                     "id_users", "phone_number", "profile_picture"}

    def __init__(self, dbController):
        self.props = {}
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table('User')
        self.changed = set()
        self.dbController = dbController

    def getById(self, id):
        response = self.dbController.execute("SELECT * from User")
        print (response)
        self.parseResponse(response[0])
#        Interests().getByUser(self)

    def parseResponse(self, response):
        self.props["address"] = {}
        for item in response:
            if item in User.VISABLE_PROPS:
                if type(response[item]) is datetime.date:
                    # Convert to ISO 8601 formated date string
                    self.props[item] = response[item].isoformat()
                elif item.startswith("address_"):
                    self.props["address"][item[8:]] = response[item]
                else:
                    self.props[item] = response[item]

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