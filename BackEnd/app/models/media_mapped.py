from sqlalchemy import Column, Integer, String, Boolean
from base import Base
from db_session import get_session, commitSession, createSession, safe_call
import boto3
import base64
import uuid

class Media(Base):
    __tablename__ = 'Media'
    id_media = Column(Integer, primary_key=True)
    id_tour = Column(Integer)
    url = Column(String)
    is_video = Column(Boolean)
    file_name = Column(String)
    display_rank = Column(Integer)
    is_deleted = Column(Boolean)

    VIDEO = ['avi', 'mp4', 'mkv', '3gp', 'wmv']

    def serialize(self):
        return {
            "url": self.url,
            "is_video": self.is_video,
            "file_name": self.file_name,
            "display_rank": self.display_rank,
            "is_deleted": self.is_deleted,
        }

    def post(self, data):
        for key in data:
            setattr(self, key, data[key])
        createSession()
        get_session().add(self)
        commitSession()

    def isVideo(self, extension):
        if extension not in self.VIDEO:
            return 0
        return 1

    def decode_base64(self, data):
        """Decode base64, padding being optional.

        :param data: Base64 data as an ASCII byte string
        :returns: The decoded byte string.

        """
        missing_padding = len(data) % 4
        if missing_padding != 0:
            data += b'=' * (4 - missing_padding)
        return base64.decodestring(data)

    def upload_to_s3(self, file, filename, key):
        resource = boto3.resource('s3')
        bucket = resource.Bucket('silktours-media')
        file = file[file.find(",")+1:]
        data = self.decode_base64(str.encode(file))
        bucket.put_object(Key=key, Body=data, GrantRead='uri=http://acs.amazonaws.com/groups/global/AllUsers')

    def upload(self, file, filename, tourid=None, userid=None):
        result = Media()
        query = get_session().query(Media).filter(Media.id_tour == tourid)
        medias = safe_call(query, "all", None)
        rank = len(medias) + 1
        extension = filename.split('.')[-1]
        key = None
        if userid is None:
            key = 'tour/' + tourid + '/' + filename
        else:
            key = 'user/profile/' + userid + '/' + filename
        url = 'https://s3.amazonaws.com/silktours-media/' + key

        result.upload_to_s3(file, filename, key)

        is_video = self.isVideo(extension)
        values = {}
        values['url'] = url
        values['is_video'] = is_video
        values['display_rank'] = rank
        values['id_tour'] = tourid
        values['file_name'] = filename
        if tourid is not None:
            result.post(values)
        return values
