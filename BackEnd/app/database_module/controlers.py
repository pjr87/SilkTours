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
        PROP = list(self.PROPS['Tour'])
        query = ("SELECT id_tour, name FROM Tour")
        self.cursor.execute(query)
        rows = self.cursor.fetchall()

        objects_list = []
        for row in rows:
            d = collections.OrderedDict()
            for i in range(len(row)):
                d[PROP[i]] = self.parse(row[i])
            objects_list.append(d)

        j = json.dumps(objects_list, sort_keys=True, indent=4, separators=(',', ': '))
        return j

    def list_tour_with_id(self, tourId):
        PROP = list(self.PROPS['Tour'])
        query = ("SELECT * FROM Tour Where id_tour=" + tourId)
        rows = self.execute(query)

        for row in rows:
            d = collections.OrderedDict()
            for i in range(len(row)):
                d[PROP[i]] = self.parse(row[i])

        d['TourEvent'] = self.get_tourevent_with_id(tourId)
        d['Stop'] = self.get_stop_with_id(tourId)
        d['Address'] = self.get_address_with_id(tourId)
        d['TourGuides'] = self.get_tourguides_with_id(tourId)
        d['Rating'] = self.get_rating_with_id(tourId)

        j = json.dumps(d, sort_keys=True, indent=4, separators=(',', ': '))
        return j

    def get_tourevent_with_id(self, tourid):
        PROP = list(self.PROPS['TourEvent'])
        query = ("SELECT * FROM TourEvent Where id_tour=" + tourid)
        rows = self.execute(query)
        e = []
        for row in rows:
            t = collections.OrderedDict()
            for i in range(len(row)):
                t[PROP[i]] = self.parse(row[i])
            e.append(t)
        return e

    def get_stop_with_id(self, tourid):
        PROP = list(self.PROPS['Stop'])
        query = ("SELECT * FROM Stop Where id_tour=" + tourid)
        rows = self.execute(query)
        e = []
        for row in rows:
            t = collections.OrderedDict()
            for i in range(len(row)):
                t[PROP[i]] = self.parse(row[i])
            e.append(t)
        return e

    def get_address_with_id(self, tourid):
        PROP = list(self.PROPS['Address'])
        query = ("SELECT * FROM Address Where id_tour=" + tourid)
        rows = self.execute(query)
        e = []
        for row in rows:
            t = collections.OrderedDict()
            for i in range(len(row)):
                t[PROP[i]] = self.parse(row[i])
            e.append(t)
        return e

    def get_tourguides_with_id(self, tourid):
        PROP = list(self.PROPS['Tourguides'])
        query = ("SELECT * FROM TourGuides Where id_tour=" + tourid)
        rows = self.execute(query)
        e = []
        for row in rows:
            t = collections.OrderedDict()
            for i in range(len(row)):
                t[PROP[i]] = self.parse(row[i])
            e.append(t)
        return e

    def get_rating_with_id(self, tourid):
        PROP = list(self.PROPS['Ratings'])
        query = ("SELECT * FROM Rating Where id_tour=" + tourid)
        rows = self.execute(query)
        e = []
        for row in rows:
            t = collections.OrderedDict()
            for i in range(len(row)):
                t[PROP[i]] = self.parse(row[i])
            e.append(t)
        return e

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





