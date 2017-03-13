package com.silktours.android.database;

import android.text.TextUtils;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 * Created by andrew on 1/26/17.
 */
public class Tour extends Base implements Serializable {
    private static List<Tour> defaultSearch;
    /*public String additional_accomadation;
    public String additional_food;
    public String additional_transport;
    public String address_city;
    public String address_country;
    public String address_street;
    public String address_suffix;
    public String address_unit;
    public String address_unit_number;
    public String address_zip;
    public Double average_rating;
    public static final String description = "description";
    public String firstStart_date;
    public String lastEnd_date;
    public Integer id_guide;
    public Integer id_rating;
    public Integer id_tour;
    public Boolean is_deleted;
    public Integer max_group_size;
    public Integer min_group_size;*/
    public static final String name = "name";
    //public Double price;
    public String profile_image;
    public Integer profile_image_width;
    public Integer profile_image_height;
    //public Integer rating_count;
    //public Object stops;

    public static class FilterParams {
        public String query;
        public String location;
        public int radius;
        public boolean useCurrentLocation;
        public double priceMin;
        public double priceMax;
        public double minRating;

        public FilterParams() {
            query = "";
            location = "";
        }
    }

    public static Tour getById(int id) throws IOException, JSONException {
        Tour tour = new Tour();
        tour.JSON = Common.getJson(Common.SERVER_URL + "/tours/"+id);
        return tour;
    }

    public static List<Tour> getDefaultSearch() throws IOException, JSONException {
        if (defaultSearch == null) {
            FilterParams defaultParams = new FilterParams();
            defaultSearch = getBySearch(defaultParams);
        }
        return defaultSearch;
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
            uri.addParam("priceMin", Double.toString(params.priceMin));
        }

        if (params.priceMax != 0.0) {
            uri.addParam("priceMax", Double.toString(params.priceMax));
        }

        if (params.minRating != 0) {
            uri.addParam("rating", Double.toString(params.minRating));
        }

        if (params.location != null && !params.location.isEmpty()) {
            uri.addParam("city", params.location);
        }

        JSONArray resultsJSON = Common.getJson(uri.build()).getJSONArray("data");
        ArrayList<Tour> result = new ArrayList<>(resultsJSON.length());
        for (int i=0; i<resultsJSON.length(); i++) {
            JSONObject tourJSON = resultsJSON.getJSONObject(i);
            Tour tour = new Tour();
            tour.JSON = tourJSON;
            Iterator<String> keysIt = tourJSON.keys();
            while(keysIt.hasNext()) {
                String key = keysIt.next();
                try {
                    Field field = Tour.class.getField(key);
                    field.set(tour, tourJSON.get(key));
                } catch (Exception e) {
                    //e.printStackTrace();
                }
            }
            result.add(tour);
        }
        return result;
    }

    public void commit() throws IOException {
        String url = Common.SERVER_URL + "/tours";
        set("bypass", true); // Bypass auth
        Log.d("JSON", JSON.toString());
        String result = Common.request(url, JSON.toString(), "POST");
        Log.d("Server", result);
    }
}
