package com.silktours.android.database;

import android.text.TextUtils;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * Represents an SQL tour
 */
public class Tour extends Base implements Serializable {
    private static List<Tour> defaultSearch;
    public static final String description = "description";
    public static final String name = "name";
    public static final Integer id_tour = 1;
    public static final Double price = 0.0;
    public String profile_image;
    public Integer profile_image_width;
    public Integer profile_image_height;

    /**
     * Used by search to specify filters
     */
    public static class FilterParams {
        public String query;
        public String location;
        public int radius;
        public boolean useCurrentLocation;
        public double priceMin;
        public double priceMax;
        public double minRating;
        public int page = 0;

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

    /**
     * Gets the default seach results from the cache if available else from the server
     * @throws IOException
     * @throws JSONException
     */
    public static List<Tour> getDefaultSearch() throws IOException, JSONException {
        if (defaultSearch == null) {
            FilterParams defaultParams = new FilterParams();
            defaultSearch = getBySearch(defaultParams);
        }
        return defaultSearch;
    }

    /**
     * Gets search results from the server
     * @param params The search to perform
     * @return A list of results
     * @throws IOException
     * @throws JSONException
     */
    public static List<Tour> getBySearch(FilterParams params) throws IOException, JSONException {
        URIBuilder uri = new URIBuilder(Common.SERVER_URL + "/search");
        uri.addParam("page", Integer.toString(params.page));
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

    public static JSONObject getTourHours(Tours t) throws IOException, JSONException {
        URIBuilder uri = new URIBuilder(Common.SERVER_URL + "/tours/available_hours");
        uri.addParam("tour_id", t.getId_tour().toString());
        uri.addParam("start_date", "2017-5-16");
        uri.addParam("end_date", "2017-7-16");
        JSONObject resultsJSON = Common.getJson(uri.build());

        return resultsJSON;
        /*for (int i=0; i<resultsJSON.length(); i++) {
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
        return result;*/
    }

    /**
     * Call after creating a new object to commit the changes to the database
     * @throws IOException
     */
    public String commitCreate() throws IOException {
        String url = Common.SERVER_URL + "/tours";
        set("bypass", true); // Bypass auth
        Log.d("JSON", JSON.toString());
        String result = Common.request(url, JSON.toString(), "POST");
        Log.d("Server", result);
        return result;
    }

    /**
     * Call after editing this object to commit the changes to the database
     * @throws IOException
     */
    public void commitModify() throws IOException {
        String url = Common.SERVER_URL + "/tours/" + id_tour;
        set("bypass", true); // Bypass auth
        Log.d("JSON", JSON.toString());
        String result = Common.request(url, JSON.toString(), "PUT");
        Log.d("Server", result);
    }
}
