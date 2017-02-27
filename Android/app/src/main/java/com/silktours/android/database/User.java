package com.silktours.android.database;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.Serializable;
import java.util.Objects;

/**
 * Created by andrew on 2/2/17.
 */
public class User extends Base implements Serializable {
    public static final String ID_USERS = "id_users";
    public static final String FIRST_NAME = "first_name";
    public static final String LAST_NAME = "last_name";
    public static final String PHONE_NUMBER = "phone_number";
    public static final String EMAIL = "email";
    public static final String PROFILE_PICTURE = "profile_picture";
    public static final String ADDRESS = "address";

    public static User current;

    public static User getByID(int id) throws IOException, JSONException {
        String url = Common.SERVER_URL + "/users/" + id;
        User result = new User();
        result.JSON = Common.getJson(url);
        return result;
    }

    public void commit() throws IOException {
        String url = Common.SERVER_URL + "/users/" + getInt(ID_USERS);
        set("bypass", true); // Bypass auth
        Log.d("JSON", JSON.toString());
        String result = Common.request(url, JSON.toString(), "PUT");
        Log.d("Server", result);
    }
}
