from sqlalchemy import Column, Integer, String, Boolean
from base import Base
from db_session import get_session, commitSession, createSession, safe_call
import boto3
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

    def upload_to_s3(self, file, filename, tourid):
        resource = boto3.resource('s3')
        bucket = resource.Bucket('silktours-media')
        bucket.put_object(Key='tour/' + tourid + '/' + filename, Body=file, GrantRead='uri=http://acs.amazonaws.com/groups/global/AllUsers')

    def upload(self, file, tourid):
        result = Media()
        query = get_session().query(Media).filter(Media.id_tour == tourid)
        medias = safe_call(query, "all", None)
        rank = len(medias) + 1
        print(rank)
        s = file.filename.split('.')
        extension = s[-1]
        filename = uuid.uuid4().hex + "." + extension
        result.upload_to_s3(file, filename, tourid)
        url = 'https://s3.amazonaws.com/silktours-media/' + 'tour/' + tourid + '/' + filename
        is_video = self.isVideo(extension)
        values = {}
        values['url'] = url
        values['is_video'] = is_video
        values['display_rank'] = rank
        values['id_tour'] = tourid
        values['file_name'] = filename
        result.post(values)
        return 's'
