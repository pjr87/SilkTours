package com.silktours.android.database;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Iterator;

/**
 * Created by andrew on 1/26/17.
 */
public class Tours {
    public String additional_accomadation;
    public String additional_food;
    public String additional_transport;
    public String address_city;
    public String address_country;
    public String address_street;
    public String address_sufix;
    public String address_unit;
    public String address_unit_number;
    public String address_zip;
    public Float average_rating;
    public String description;
    public String firstStart_date;
    public String lastEnd_date;
    public Integer id_guide;
    public Integer id_rating;
    public Integer id_tour;
    public Boolean is_deleted;
    public Integer max_group_size;
    public Integer min_group_size;
    public String name;
    public Float price;
    public String profile_image;
    public Integer rating_count;

    public static Tours[] getBySearch() throws IOException, JSONException {
        JSONArray resultsJSON = Common.getJson(Common.SERVER_URL + "/search").getJSONArray("data");
        Tours[] result = new Tours[resultsJSON.length()];

        for (int i=0; i<resultsJSON.length(); i++) {
            JSONObject tourJSON = resultsJSON.getJSONObject(i);
            Tours tour = new Tours();
            Iterator<String> keysIt = tourJSON.keys();
            while(keysIt.hasNext()) {
                String key = keysIt.next();
                try {
                    Field field = Tours.class.getField("key");
                    field.set(tour, tourJSON.get(key));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            result[i] = tour;
        }
        return result;
    }
}
