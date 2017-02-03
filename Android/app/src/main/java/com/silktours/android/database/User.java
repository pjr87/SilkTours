package com.silktours.android.database;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

/**
 * Created by andrew on 2/2/17.
 */
public class User {
    String first_name;
    String last_name;
    String phone_number;
    String email;

    public static User getByID(int id) throws IOException, JSONException {
        String url = Common.SERVER_URL + "/users";
        JSONObject userJSON = Common.getJson(url);
        User result = new User();
        result.first_name = userJSON.getString("first_name");
        result.last_name = userJSON.getString("last_name");
        result.phone_number = userJSON.getString("phone_number");
        result.email = userJSON.getString("email");
        return result;
    }
}
