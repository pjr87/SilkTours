import boto3
import mysql.connector
import uuid
import json
import datetime
import collections

class S3Controller:
    PROP = ['id_media', 'id_tour', 'url', 'is_video', 'file_name', 'display_rank', 'is_deleted', 'id_media', 'id']

    VIDEO = ['avi', 'mp4', 'mkv', '3gp', 'wmv']

    def __init__(self):
        self.resource = boto3.resource('s3')
        self.bucket = self.resource.Bucket('silktours-media')
        self.db = mysql.connector.connect(user='silktours', password='32193330',
                                          host='silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com',
                                          database='silktours')
        self.cursor = self.db.cursor()


    def post(self, values):
        query = ("INSERT INTO Media (id_tour, file_name, url, is_video, display_rank) VALUES (%s, %s, %s, %s, %s)")
        self.cursor.execute(query, values)
        self.db.commit()

    def isVideo(self, extension):
        if extension not in self.VIDEO:
            return 0
        return 1

    def parse(self, data):
        if isinstance(data, datetime.date):
            return data.strftime(self.f)

        return data

    def upload(self, file, tourid):
        query = ("SELECT * FROM Media Where id_tour=" + tourid)
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        rank = len(rows) + 1
        print(rank)
        s = file.filename.split('.')
        extension = s[-1]
        filename = uuid.uuid4().hex + "." + extension
        self.bucket.put_object(Key= 'tour/' + tourid + '/' + filename, Body=file)
        url = 'https://s3.amazonaws.com/silktours-media/' + 'tour/' + tourid + '/' + filename
        isV = self.isVideo(extension)
        values = [tourid, filename, url, isV, rank]
        self.post(values)
        return "s"

    def get_image(self, tourId):
        query = ("SELECT * FROM Media Where id_tour=" + tourId)
        self.cursor.execute(query)
        rows = self.cursor.fetchall()

        objects_list = []
        for row in rows:
            d = collections.OrderedDict()
            for i in range(len(row)):
                d[self.PROP[i]] = self.parse(row[i])
            objects_list.append(d)

        j = json.dumps(objects_list, sort_keys=True, indent=4, separators=(',', ': '))
        return j