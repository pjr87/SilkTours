package com.silktours.android.database;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

/**
 * Created by andrew on 2/2/17.
 */
public class User {
    public String first_name;
    public String last_name;
    public String phone_number;
    public String email;
    public String profile_picture;

    public static User getByID(int id) throws IOException, JSONException {
        String url = Common.SERVER_URL + "/users/" + id;
        JSONObject userJSON = Common.getJson(url);
        User result = new User();
        result.first_name = userJSON.getString("first_name");
        result.last_name = userJSON.getString("last_name");
        result.phone_number = userJSON.getString("phone_number");
        result.email = userJSON.getString("email");
        result.profile_picture = userJSON.getString("profile_picture");
        return result;
    }
}
