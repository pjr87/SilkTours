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


def limiting_query(query, page=0, page_size=None):
    if page_size:
        query = query.limit(page_size)
    if page:
        query = query.offset(page*page_size)
    return query


def safe_call(obj, fname, arg, retryCount=0):
    method_to_call = getattr(obj, fname)
    try:
        if arg is None:
            return method_to_call()
        return method_to_call(arg)
    except Exception as e:
        print("SQL Error: " + str(e))
        session.rollback()
        if (retryCount < 2):
            return safe_call(obj, fname, arg, retryCount+1)


def commitSession(obj=None, obj2=None):
    createSession()
    if obj is not None:
        session.add(obj)
    if obj2 is not None:
        session.add(obj2)
    try:
        session.commit()
    except Exception as e:
        print("INFO: session commit failed")
        print(e)
        session.rollback()
