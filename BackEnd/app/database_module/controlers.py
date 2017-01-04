import mysql.connector
import json
import collections
import datetime

class Tours:
    PROPS = {}

    REQUIRED_PROPS = {}

    VISABLE_PROPS = {}

    def __init__(self):
        self.conn = mysql.connector.connect(user='silktours', password='32193330', host='silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com', database='silktours')
        self.cursor = self.conn.cursor()
        self.f = '%Y-%m-%d %H:%M:%S'
        print("Connection is created")
        

    def list_tours(self):
        query = ("SELECT id_tour, name FROM Tour")
        self.cursor.execute(query)
        rows = self.cursor.fetchall()

        objects_list = []
        for row in rows:
            print(row)
            d = collections.OrderedDict()
            d['Id'] = row[0]
            d['Name'] = row[1]
            objects_list.append(d)

        j = json.dumps(objects_list, sort_keys=True, indent=4, separators=(',', ': '))
        return j

    def list_tour_with_id(self, tourId):
        query = ("SELECT * FROM Tour Where id_tour=" + tourId)
        self.cursor.execute(query)
        rows = self.cursor.fetchall()

        objects_list = []
        for row in rows:
            print(row)
            d = collections.OrderedDict()
            l = collections.OrderedDict()
            t = collections.OrderedDict()
            s = collections.OrderedDict()
            i = collections.OrderedDict()
            d['ID'] = row[0]
            t['StartDate'] = row[1].strftime(self.f)
            t['EndDatae'] = row[2].strftime(self.f)
            d['Time'] = t
            d['TourName'] = row[3]
            d['Price'] = row[4]
            i['Description'] = row[5]
            s['MinGroupSize'] = row[6]
            s['MaxGroupSize'] = row[7]
            d['GroupSize'] = s
            l['ZipCode'] = row[8]
            l['StreetName'] = row[9]
            l['AddressSuffix'] = row[10]
            l['Unit'] = row[11]
            l['UnitNumber'] = row[12]
            l['City'] = row[13]
            l['Country'] = row[14]
            d['Location'] = l
            d['ProfileImage'] = row[15]
            d['TourGuideID'] = row[16]
            d['IsDeleted'] = row[17]
            i['AdditionalAccomadation'] = row[18]
            i['AdditionalFood'] = row[19]
            i['AdditionalTransport'] = row[20]
            d['Information'] = i
            d['Rating'] = row[21]
            objects_list.append(d)

        j = json.dumps(objects_list, sort_keys=True, indent=4, separators=(',', ': '))
        return j

    def post_tour(self, props):
        for prop in props:
            print(prop + props[prop])
        return "hhhh"
'''

    def list_tour_with_id(self, id):



    def edit_tour_with_id(self, id):

    def list_tourevent_with_id(self, id):

