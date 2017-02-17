package com.silktours.android.database;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by andrew on 2/16/17.
 */
public class Base {
    protected JSONObject JSON;

    public Base() {
        JSON = new JSONObject();
    }

    public String getStr(String key) {
        return (String) get(key);
    }

    public Integer getInt(String key) {
        return (Integer) get(key);
    }

    public Object get(String key) {
        try {
            return JSON.get(key);
        } catch (JSONException e) {
            return null;
        }
    }

    public void set(String key, Object value) {
        try {
            JSON.put(key, value);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
