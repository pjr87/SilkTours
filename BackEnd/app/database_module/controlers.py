import boto3
import uuid
from botocore.exceptions import ClientError
import json
import MySQLdb

class dyanamoDbController:
    def __init__(self):
        self.client = boto3.client('dynamodb')
        self.resource = boto3.resource('dynamodb')
        self.db = MySQLdb.connect(host="silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com",
                     port=3306,
                     user="silktours",
                     passwd="32193330",
                     db="silktours")

    def execute(self, sql_cmd):
        cur = self.db.cursor(MySQLdb.cursors.DictCursor)
        cur.execute(sql_cmd)
        return cur.fetchall()

    def list_tours(self):
        response = self.client.scan(TableName='Tour') # TODO change 'test' to tour table
        items = response['Items']
        json_response = json.dumps(items, sort_keys=True, indent=4, separators=(',', ': '))
        print("GetTables succeeded")
        return json_response

    def list_tour_with_id(self, id):
        table = self.resource.Table('Tour') # TODO TODO change 'test' to tour table
        try:
            response = table.get_item(
                Key={
                    't_id': id
                }
            )
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            item = response['Item']
            print("GetItem succeeded")
            json_response = json.dumps(item, sort_keys=True, indent=4, separators=(',', ': '))
            return json_response

    def post_tour_with_name(self, tourname):
        table = self.resource.Table('Tour')
        id = uuid.uuid4()
        response = table.put_item(
            Item={
                't_id': str(id),
                't_locations': tourname,
                't_FirstDateTime': '10-24-2016'
            }
        )
        print("PutItem succeeded")
        json_response = json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))
        return json_response

    def edit_tour_with_id(self, id):
        table = self.resource.Table('Tour')
        response = table.update_item(
            Key={
                't_id': id
            },
            UpdateExpression="set t_guideName = :r",
            ExpressionAttributeValues={
                ':r': 'Yongqiang Fan'
            },
            ReturnValues="UPDATED_NEW"
        )

        print("UpdateItem succeeded")
        json_response = json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))
        return json_response

    def list_rating_with_id(self, id):
        table = self.resource.Table('Rating')  # TODO TODO change 'test' to tour table
        try:
            response = table.get_item(
                Key={
                    'r_id': id
                }
            )
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            item = response['Item']
            print("GetItem succeeded")
            json_response = json.dumps(item, sort_keys=True, indent=4, separators=(',', ': '))
            return json_response

    def list_tourevent_with_id(self, id):
        table = self.resource.Table('TourEvent')  # TODO TODO change 'test' to tour table
        try:
            response = table.get_item(
                Key={
                    'te_id': id
                }
            )
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            item = response['Item']
            print("GetItem succeeded")
            json_response = json.dumps(item, sort_keys=True, indent=4, separators=(',', ': '))
            return json_response

    def list_interest_with_id(self, id):
        table = self.resource.Table('Interest')  # TODO TODO change 'test' to tour table
        try:
            response = table.get_item(
                Key={
                    'i_id': id
                }
            )
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            item = response['Item']
            print("GetItem succeeded")
            json_response = json.dumps(item, sort_keys=True, indent=4, separators=(',', ': '))
            return json_response
