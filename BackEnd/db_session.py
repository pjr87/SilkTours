from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.orm import scoped_session
import threading

engine = create_engine('mysql+mysqlconnector://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours')

Session = scoped_session(sessionmaker(bind=engine))
sessions = {}


def get_session():
    global sessions
    tid = threading.get_ident()
    if tid not in sessions or sessions[tid] is None:
        sessions[tid] = Session()
    return sessions[tid]

def close_session():
    tid = threading.get_ident()
    if tid in sessions and sessions[tid] is not None:
        sessions[tid].close()
    sessions[tid] = None

def createSession():
    get_session()

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
        get_session().rollback()
        if (retryCount < 2):
            return safe_call(obj, fname, arg, retryCount+1)


def commitSession(obj=None, obj2=None):
    createSession()
    if obj is not None:
        get_session().add(obj)
    if obj2 is not None:
        get_session().add(obj2)
    try:
        get_session().commit()
    except Exception as e:
        print("INFO: session commit failed")
        print(e)
        get_session().rollback()
