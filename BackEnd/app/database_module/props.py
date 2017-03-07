import mysql.connector
import json
import collections
import datetime



class Props:


    TOUR = ['id_tour', 'firstStart_date', 'lastEnd_date', 'name', 'price', 'description', 'min_group_size', 'max_group_size', 'profile_image', 'is_deleted', 'additional_accomadation', 'additional_food', 'additional_transport', 'id_rating', 'average_rating', 'rating_count', 'profile_image_width', 'profile_image_height', 'id_tour']

    STOP = ['id_stop', 'lat', 'lon', 'id_tour', 'name', 'index', 'id_stop']

    ADDRESS = ['id_address', 'street', 'unit', 'city', 'country', 'zip', 'state_code', 'id_address']

    TOUREVENT = ['id_tourEvent', 'id_guide', 'id_rating', 'id_tour', 'id_user', 'start_date_time', 'end_date_time', 'state', 'id_tourEvent']

    RATING = ['id_rating', 'comments', 'date_time_created', 'rate', 'id_tour', 'id_user', 'is_deleted', 'id_rating']

    TOURGUIDES = ['id_user', 'id_tour', 'id_tour_guide', 'id_tour_guide']



    IDS = {'Tour':'id_tour', 'TourEvent':'id_tourEvent', 'Media':'id_media'}

    def __init__(self):
        self.PROPS = {}
        self.PROPS['Tour'] = self.TOUR
        self.PROPS['TourEvent'] = self.TOUREVENT
        self.PROPS['Stop'] = self.STOP
        self.PROPS['Address'] = self.ADDRESS
        self.PROPS['Ratings'] = self.RATING
        self.PROPS['Tourguides'] = self.TOURGUIDES


