import boto3
import mysql.connector
from mysql.connector import  errorcode
from botocore.exceptions import ClientError
import json

class Tours:
    PROPS = {"t_FirstDateTime", "t_LastDateTime", "t_additionalAccomadation", "t_additionalFood", "t_additionalTransport", "t_description", "t_groupSize",
             "t_guideName", "t_interestID", "t_locations", "t_name", "t_numberOfDays", "t_pictures", "t_price", "t_rating", "t_videos"}
    REQUIRED_PROPS = {}

    VISABLE_PROPS = {}

    def __init__(self):
        self.conn = mysql.connector.connect(user='silktours', password='32193330', host='silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com', database='silktours')
        self.cursor = self.conn.cursor()
        print("Connection is created")

    def list_tours(self):
        query = ("SELECT * FROM Tour")
        self.cursor.execute(query)

        while row is not None:
            print(row[0])
            row = self.cursor.fetchone()

'''

    def list_tour_with_id(self, id):

    def post_tour(self, props):

    def edit_tour_with_id(self, id):

    def list_tourevent_with_id(self, id):
'''