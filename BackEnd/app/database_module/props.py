import mysql.connector
import json
import collections
import datetime



class Props:


    TOUR = {'id_tour':'%s', 'firstStart_date':'%s', 'lastEnd_date':'%s', 'name':'%s', 'price':'%s', 'description':'%s', 'min_group_size':'%d',
             'max_group_size':'%d',
             'address_zip':'%s', 'address_street':'%s', 'address_suffix':'%s', 'address_unit':'%s', 'address_unit_number':'%s', 'address_city':'%s',
             'address_country':'%s',
             'profile_image':'%s', 'id_guide':'%d', 'is_deleted':'%d', 'additional_accomadation':'%s', 'additional_food':'%s',
             'additional_transport':'%s', 'id_rating':'%d', 'average_rating':'%s', 'rating_count':'%d'}

    TOUREVENT = {'id_tourEvent':'%s', 'id_guide':'%s', 'id_rating':'%s', 'id_tour':'%s', 'id_user':'%s'}

    IDS = {'Tour':'id_tour', 'TourEvent':'id_tourEvent'}

    def __init__(self):
        self.PROPS = {}
        self.PROPS['Tour'] = self.TOUR
        self.PROPS['TourEvent'] = self.TOUREVENT


