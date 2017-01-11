import mysql.connector
import json
import collections
import datetime

from whoosh import *


class SearchController:
    PROPS = ['id_tour', 'firstStart_date', 'lastEnd_date', 'name', 'price', 'description', 'min_group_size',
             'max_group_size',
             'address_zip', 'address_street', 'address_suffix', 'address_unit', 'address_unit_number', 'address_city',
             'address_country',
             'profile_image', 'id_guide', 'is_deleted', 'additional_accomadation', 'additional_food',
             'additional_transport', 'id_rating']

    FIELD = ['name', 'description',
             'address_zip', 'address_street', 'address_suffix', 'address_city',
             'address_country',
             'additional_accomadation', 'additional_food', 'additional_transport']

    def __init__(self):
        self.conn = mysql.connector.connect(user='silktours', password='32193330', host='silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com', database='silktours')
        self.cursor = self.conn.cursor()
        self.f = '%Y-%m-%d'
        print("Connection is created")

    def parse(self, data):
        if isinstance(data, datetime.date):
            return data.strftime(self.f)

        return data

    def execute(self, query):
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def search(self):
        query = "SELECT * FROM Tour WHERE CONCAT_WS('', name, description) LIKE '%Qingdao%'"
        rows = self.execute(query)

        objects_list = []
        for row in rows:
            print(row)
            d = collections.OrderedDict()
            for i in range(len(row)):
                d[self.PROPS[i]] = self.parse(row[i])
            objects_list.append(d)

            return json.dumps(objects_list, sort_keys=True, indent=4, separators=(',', ': '))
