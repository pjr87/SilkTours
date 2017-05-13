package com.silktours.android.database;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

/**
 * Created by yongqiangfan on 2/6/17.
 */

public class Tours extends Base implements Serializable  {
    private String firstStart_date;
    private String lastEnd_date;
    private String address_city;
    private String address_country;
    private String[] guides;
    public Integer id_tour;
    private Boolean is_deleted;
    private String name;
    private String profile_image;
    private String description;
    private String language;
    private String additionalStay;
    private String additionalFood;
    private String additionalTravel;
    private String price;
    private Double[][] stops;

    public JSONObject getJSON() {
        return JSON;
    }

    public Tours(JSONObject jsObj) throws JSONException{
        this.JSON = jsObj;
        getInfo();
    }

    public void getInfo() throws JSONException{
        JSONArray jsonGuide = JSON.getJSONArray("guides");
        guides = new String[jsonGuide.length()];
        for(int i = 0; i < jsonGuide.length(); i++) {
            guides[i] = jsonGuide.getJSONObject(i).getString("first_name") + " " + jsonGuide.getJSONObject(i).getString("last_name");
        }
        id_tour = JSON.getInt("id_tour");
//        is_deleted = JSON.getBoolean("is_deleted");
        name = JSON.getString("name");
        profile_image = JSON.getString("profile_image");
        firstStart_date = JSON.getString("firstStart_date");
        lastEnd_date = JSON.getString("lastEnd_date");
        description = JSON.getString("description");
        language = JSON.getString("language");
        price = JSON.getString("price");
        additionalStay = JSON.getString("additional_accomadation");
        additionalFood = JSON.getString("additional_food");
        additionalTravel = JSON.getString("additional_transport");
        if (!JSON.has("stops")) {
            JSON.put("stops", new JSONArray());
        }
        JSONArray jsonStop = JSON.getJSONArray("stops");
        stops = new Double[jsonStop.length()][2];

        for (int i = 0; i < jsonStop.length(); i++) {
            stops[i][0] = jsonStop.getJSONObject(i).getDouble("lat");
            stops[i][1] = jsonStop.getJSONObject(i).getDouble("lon");
        }

    }

    public String getName(){
        return name;
    }

    public String getStartDate(){
        return firstStart_date;
    }

    public String getEndDate(){
        return lastEnd_date;
    }

    public String getCity(){
        return address_city;
    }

    public String getProfileImage() {
        return profile_image;
    }

    public String getDescription() { return  description; }

    public String getLanguage() { return language;}

    public String getAdditionalStay() {return   additionalStay;}

    public String getAdditionalFood() {return   additionalFood;}

    public String getAdditionalTravel() {return   additionalTravel;}

    public String getPrice() {
        return price;
    }

    public Double[][] getStops() {
        return stops;
    }

    public Integer getId_tour() {
        return id_tour;
    }

}
