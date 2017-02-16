package com.silktours.android.database;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by yongqiangfan on 2/6/17.
 */

public class Tours {
    private JSONObject jsObj;
    private String firstStart_date;
    private String lastEnd_date;
    private String address_city;
    private String address_country;
    private String id_guide;
    private Integer id_tour;
    private Boolean is_deleted;
    private String name;
    private String profile_image;
    

    public Tours(JSONObject jsObj) throws JSONException{
        this.jsObj = jsObj;
        getInfo();
    }

    public void getInfo() throws JSONException{
        this.address_city = jsObj.getString("address_city");
        this.address_country = jsObj.getString("address_country");
        this.id_guide = jsObj.getString("id_guide");
        this.id_tour = jsObj.getInt("id_tour");
        this.is_deleted = jsObj.getBoolean("is_deleted");
        this.name = jsObj.getString("name");
        this.profile_image = jsObj.getString("profile_image");
        this.firstStart_date = jsObj.getString("firstStart_date");
        this.lastEnd_date = jsObj.getString("lastEnd_date");
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



}
