import mysql.connector
import json
import collections
import datetime



class DbController:
    PROPS = ['id_tour', 'firstStart_date', 'lastEnd_date', 'name', 'price', 'description', 'min_group_size',
             'max_group_size',
             'address_zip', 'address_street', 'address_suffix', 'address_unit', 'address_unit_number', 'address_city',
             'address_country',
             'profile_image', 'id_guide', 'is_deleted', 'additional_accomadation', 'additional_food', 'additional_transport', 'id_rating']

    PROPTYPES = {'id_tour':'%s', 'firstStart_date':'%s', 'lastEnd_date':'%s', 'name':'%s', 'price':'%s', 'description':'%s', 'min_group_size':'%d',
             'max_group_size':'%d',
             'address_zip':'%s', 'address_street':'%s', 'address_suffix':'%s', 'address_unit':'%s', 'address_unit_number':'%s', 'address_city':'%s',
             'address_country':'%s',
             'profile_image':'%s', 'id_guide':'%d', 'is_deleted':'%d', 'additional_accomadation':'%s', 'additional_food':'%s',
             'additional_transport':'%s', 'id_rating':'%d'}

    Test = []

    REQUIRED_PROPS = []

    VISABLE_PROPS = []

    def __init__(self):
        self.db = mysql.connector.connect(user='silktours', password='32193330', host='silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com', database='silktours')
        self.cursor = self.db.cursor()
        self.f = '%Y-%m-%d'
        print("Connection is created")

    def execute(self, query):
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def parse(self, data):
        if isinstance(data, datetime.date):
            return data.strftime(self.f)

        return data

    def parsedb(self, entry, value):
        if "date" in entry:
            return datetime.datetime.strptime(value, self.f).date()

        return value

    def insert(self, entrys, values):
        query = ("USE silktours")
        self.cursor.execute(query)
        fields = "("
        data = "("
        for entry in entrys:
            fields = fields + entry + ","
            data = data + self.PROPTYPES[entry] + ","
        fields = fields[:-1] + ")"
        data = data[:-1] + ");"
        query = ("INSERT INTO Tour " + fields + " VALUES " + data)
        self.cursor.execute(query, values)
        self.db.commit()


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
        rows = self.execute(query)

        objects_list = []
        for row in rows:
            print(row)
            d = collections.OrderedDict()
            for i in range(len(row)):
                d[self.PROPS[i]] = self.parse(row[i])
            objects_list.append(d)

        j = json.dumps(objects_list, sort_keys=True, indent=4, separators=(',', ': '))
        return j

    def post_tour(self, props):
        entrys = []
        values = []
        for prop in props:
            print(prop + ":" + props[prop])
            if prop in self.PROPS:
                entrys.append(prop)
                values.append(self.parsedb(prop, props[prop]))

        self.insert(entrys, values)
        return "hhh"

    def edit_tour(self, id, props):
        return "jjj"


