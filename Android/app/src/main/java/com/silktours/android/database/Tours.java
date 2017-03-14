package com.silktours.android.database;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

/**
 * Created by yongqiangfan on 2/6/17.
 */

public class Tours implements Serializable{
    private JSONObject jsObj;
    private String firstStart_date;
    private String lastEnd_date;
    private String address_city;
    private String address_country;
    private String[] guides;
    private Integer id_tour;
    private Boolean is_deleted;
    private String name;
    private String profile_image;
    private String description;
    private String price;
    private Double[][] stops;
    

    public Tours(JSONObject jsObj) throws JSONException{
        this.jsObj = jsObj;
        getInfo();
    }

    public void getInfo() throws JSONException{
        JSONArray jsonGuide = jsObj.getJSONArray("guides");
        guides = new String[jsonGuide.length()];
        for(int i = 0; i < jsonGuide.length(); i++) {
            guides[i] = jsonGuide.getJSONObject(i).getString("first_name") + " " + jsonGuide.getJSONObject(i).getString("last_name");
        }
        id_tour = jsObj.getInt("id_tour");
//        is_deleted = jsObj.getBoolean("is_deleted");
        name = jsObj.getString("name");
        profile_image = jsObj.getString("profile_image");
        firstStart_date = jsObj.getString("firstStart_date");
        lastEnd_date = jsObj.getString("lastEnd_date");
        description = jsObj.getString("description");
        price = jsObj.getString("price");
        JSONArray jsonStop = jsObj.getJSONArray("stops");
        stops = new Double[jsonStop.length()][2];
        for(int i = 0; i < jsonStop.length(); i++) {
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

    public String getDescription() {
        return  description;
    }

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
