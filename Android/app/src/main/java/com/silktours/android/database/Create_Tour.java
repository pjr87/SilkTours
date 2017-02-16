package com.silktours.android.database;

import java.io.IOException;
import java.util.Date;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
/**
 * Created by gizmo_000 on 2/14/2017.
 */

public class Create_Tour {
    public String tour_name;
    public Integer id_guide;
    public String tour_desc;
    public String locations[];
    /*public String address_city;
    public String address_country;
    public String address_street;
    public String address_suffix;
    public String address_unit;
    public String address_unit_number;
    public String address_zip;*/
    public String firstStart_date;
    public String lastEnd_date;
    public String pictures[];
    public String tour_picture;
    public Date dates[];

    public Double price;
    public Integer max_group_size;
    public Integer min_group_size;


    public static int updateDatabase() throws IOException, JSONException {
        return 0;
    }

}