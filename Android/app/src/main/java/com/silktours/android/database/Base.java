package com.silktours.android.database;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by andrew on 2/16/17.
 */
public class Base {
    public JSONObject JSON;

    public Base() {
        JSON = new JSONObject();
    }

    public String getStr(String key) {
        try {
            return (String) get(key);
        } catch (ClassCastException e) {
            return "";
        }
    }

    public Integer getInt(String key) {
        return (Integer) get(key);
    }

    public JSONObject getJSONObject(String key) {
        return (JSONObject) get(key);
    }

    public Object get(String key) {
        return get(JSON, key);
    }

    public Object get(JSONObject obj, String key) {
        try {
            if (key.contains(":")) {
                String[] pair = key.split(":", 2);
                return get(obj.getJSONObject(pair[0]), pair[1]);
            }
            return obj.get(key);
        } catch (JSONException e) {
            return null;
        }
    }

    public void set(String key, Object value) {
        set(JSON, key, value);
    }

    private static void set(JSONObject obj, String key, Object value) {
        try {
            if (key.contains(":")) {
                String[] pair = key.split(":", 2);
                set(obj.getJSONObject(pair[0]), pair[1], value);
                return;
            }

            obj.put(key, value);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
