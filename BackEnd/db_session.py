from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.orm import scoped_session

engine = create_engine('mysql+mysqlconnector://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours')

Session = scoped_session(sessionmaker(bind=engine))
session = Session()


def createSession():
    global session
    if session is None:
        session = Session()


def commitSession(obj=None):
    createSession()
    if obj is not None:
        session.add(obj)
    try:
        session.commit()
    except Exception as e:
        print("INFO: session commit failed")
        print(e)
        session.rollback()
