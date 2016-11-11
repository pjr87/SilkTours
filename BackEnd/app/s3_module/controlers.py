import boto3
from botocore.exceptions import ClientError
import json

class S3Controller:
    def __init__(self):
        self.resource = boto3.resource('s3')

    def getItems(self,):
        bucket = self.resource.Bucket('silktourtest')
        bucket_list = []
        for object in bucket.objects.all():
            bucket_list.append(str(object))

        return ''.join(bucket_list)