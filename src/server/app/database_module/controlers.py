import boto3

class dyanamoDbController:
    def __init__(self):
        self.client = boto3.client('dynamodb')


    def listTables(self):
        response = self.client.list_tables()
