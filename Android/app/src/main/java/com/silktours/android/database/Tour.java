package com.silktours.android.database;

import android.text.TextUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 * Created by andrew on 1/26/17.
 */
public class Tour {
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

    public static class FilterParams {
        public String query;
        public String location;
        public int radius;
        public boolean useCurrentLocation;
        public float priceMin;
        public float priceMax;
        public float minRating;

        public FilterParams() {
            query = "";
            location = "";
        }
    }

    public static List<Tour> getBySearch(FilterParams params) throws IOException, JSONException {
        URIBuilder uri = new URIBuilder(Common.SERVER_URL + "/search");
        if (params.query != null) {
            List<String> keywords = Arrays.asList(params.query.split(" "));
            if (keywords.size() > 0) {
                uri.addParam("keywords", TextUtils.join(",", keywords));
            }
        }

        if (params.priceMin != 0) {
            uri.addParam("priceMin", Float.toString(params.priceMin));
        }

        if (params.priceMax != 0.0) {
            uri.addParam("priceMax", Float.toString(params.priceMax));
        }

        if (params.minRating != 0) {
            uri.addParam("rating", Float.toString(params.minRating));
        }

        if (params.location != null && !params.location.isEmpty()) {
            uri.addParam("city", params.location);
        }

        JSONArray resultsJSON = Common.getJson(uri.build()).getJSONArray("data");
        ArrayList<Tour> result = new ArrayList<>(resultsJSON.length());
        for (int i=0; i<resultsJSON.length(); i++) {
            JSONObject tourJSON = resultsJSON.getJSONObject(i);
            Tour tour = new Tour();
            Iterator<String> keysIt = tourJSON.keys();
            while(keysIt.hasNext()) {
                String key = keysIt.next();
                try {
                    Field field = Tour.class.getField(key);
                    field.set(tour, tourJSON.get(key));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            result.add(tour);
        }
        return result;
    }
}
