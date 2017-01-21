import mysql.connector
import json
import collections
import datetime
from .props import Props


class DbController:

    def __init__(self):
        self.db = mysql.connector.connect(user='silktours', password='32193330',
                                          host='silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com',
                                          database='silktours')
        self.cursor = self.db.cursor()
        self.f = '%Y-%m-%d'
        self.p = Props()
        self.PROPS = self.p.PROPS
        self.IDS = self.p.IDS

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
        PROP = list(self.PROPS['Tour'])
        query = ("SELECT * FROM Tour Where id_tour=" + tourId)
        rows = self.execute(query)

        objects_list = []
        for row in rows:
            d = collections.OrderedDict()
            for i in range(len(row)):
                d[PROP[i]] = self.parse(row[i])

        PROP = list(self.PROPS['TourEvent'])
        query = ("SELECT * FROM TourEvent Where id_tour=" + tourId)
        rows = self.execute(query)
        e = []
        for row in rows:
            t = collections.OrderedDict()
            for i in range(len(row)):
                t[PROP[i]] = self.parse(row[i])
            e.append(t)
        d['TourEvents'] = e

        objects_list.append(d)
        j = json.dumps(objects_list, sort_keys=True, indent=4, separators=(',', ': '))
        return j

    def post(self, props, table):
        entrys = []
        values = []
        for prop in props:
            if prop in self.PROPS[table]:
                entrys.append(prop)
                values.append(self.parsedb(prop, props[prop]))

        PROPTYPES = self.PROPS[table]
        fields = "("
        data = "("
        for entry in entrys:
            fields = fields + entry + ","
            data = data + '%s' + ","
        fields = fields[:-1] + ")"
        data = data[:-1] + ");"
        query = ("INSERT INTO " + table + fields + " VALUES " + data)
        self.cursor.execute(query, values)
        self.db.commit()
        return "hhh"

    def edit(self, id, props, table):
        entrys = []
        values = []
        for prop in props:
            if prop in self.PROPS[table]:
                entrys.append(prop)
                values.append(self.parsedb(prop, props[prop]))
        fields = ""
        for entry in entrys:
            fields = fields + entry + "=" + '%s' + ","
        fields = fields[:-1]
        query = ("UPDATE " + table + " SET " + fields + " WHERE " + self.IDS[table] + "=" + id)
        self.cursor.execute(query, values)
        self.db.commit()
        return "jjj"

    def delete(self, id, table):
        query = ("UPDATE " + table + " SET is_deleted=1 WHERE " + self.IDS[table] + "=" + id)
        self.cursor.execute(query)
        self.db.commit()





