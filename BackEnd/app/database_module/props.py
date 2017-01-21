import mysql.connector
import json
import collections
import datetime



class Props:


    TOUR = ['id_tour', 'firstStart_date', 'lastEnd_date', 'name', 'price', 'description', 'min_group_size',
             'max_group_size',
             'address_zip', 'address_street', 'address_suffix', 'address_unit', 'address_unit_number', 'address_city',
             'address_country',
             'profile_image', 'id_guide', 'is_deleted', 'additional_accomadation', 'additional_food',
             'additional_transport', 'id_rating', 'average_rating', 'rating_count']

    TOUREVENT = ['id_tourEvent', 'id_guide', 'id_rating', 'id_tour', 'id_user']


    IDS = {'Tour':'id_tour', 'TourEvent':'id_tourEvent', 'Media':'id_media'}

    def __init__(self):
        self.PROPS = {}
        self.PROPS['Tour'] = self.TOUR
        self.PROPS['TourEvent'] = self.TOUREVENT


