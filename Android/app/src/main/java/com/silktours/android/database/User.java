package com.silktours.android.database;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

import com.silktours.android.LoginActivity;

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
    public static final String EXPIRE_TIME = "expire_time";

    public static User current;

    public static User getByID(int id) throws IOException, JSONException {
        String url = Common.SERVER_URL + "/users/" + id;
        User result = new User();
        result.JSON = Common.getJson(url);
        return result;
    }

    public static User getByEmail(String email) throws IOException, JSONException {
        String url = Common.SERVER_URL + "/users/email/" + email;
        User result = new User();
        result.JSON = Common.getJson(url);
        if (result.JSON.has("exists")) {
            return null;
        }
        return result;
    }


    public void create() throws IOException {
        String url = Common.SERVER_URL + "/users";
        String result = Common.request(url, JSON.toString(), "POST");
    }

    public void commit() throws IOException {
        String url = Common.SERVER_URL + "/users/" + getInt(ID_USERS);
        Log.d("JSON", JSON.toString());
        String result = Common.request(url, JSON.toString(), "PUT");
        Log.d("Server", result);
    }

    public static User getFromSharedPrefs(Activity context) throws IOException, JSONException {
        SharedPreferences sharedPref = context.getPreferences(Context.MODE_PRIVATE);
        int user_id = sharedPref.getInt("user_id", -1);
        long expire_time = sharedPref.getLong("expire_time", -1);
        if (System.currentTimeMillis() < expire_time && user_id > -1) {
            User user = getByID(user_id);
            //SharedPreferences.Editor editor = sharedPref.edit();
            return user;
        }
        return null;

    }
}
