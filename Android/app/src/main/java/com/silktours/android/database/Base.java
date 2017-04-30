package com.silktours.android.database;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Base class for all database objects
 * All key fields accept key1:key2 format to lookup nested values
 */
public class Base implements Serializable{
    public JSONObject JSON;

    public Base() {
        JSON = new JSONObject();
    }

    /**
     * Get a string by key
     * @param key The key to find
     * @return The result, null if key was not found, or "" if value was not a string
     */
    public String getStr(String key) {
        try {
            return (String) get(key);
        } catch (ClassCastException e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * Get an integer by key
     * @param key The key to find
     * @return The result, null if key was not found
     */
    public Integer getInt(String key) {
        return (Integer) get(key);
    }

    /**
     * Get an double by key
     * @param key The key to find
     * @return The result, null if key was not found
     */
    public Double getDbl(String key) {
        return (Double) get(key);
    }

    /**
     * Get an json object by key
     * @param key The key to find
     * @return The result, null if key was not found
     */
    public JSONObject getJSONObject(String key) {
        return (JSONObject) get(key);
    }

    /**
     * Get an object by key
     * @param key The key to find
     * @return The result, null if key was not found
     */
    public Object get(String key) {
        return get(JSON, key);
    }

    /**
     * Get an integer by key
     * @param key The key to find
     * @return The result, null if key was not found
     */
    public Object get(JSONObject obj, String key) {
        try {
            if (key.contains(":")) {
                String[] pair = key.split(":", 2);
                return get(obj.getJSONObject(pair[0]), pair[1]);
            }
            return obj.get(key);
        } catch (JSONException e) {
            if (!key.equals("city")) {
                Log.d("Silk", "City Not Found");
                return null;
            }
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Sets a value
     * @param key The key to set
     * @param value The new value
     */
    public void set(String key, Object value) {
        set(JSON, key, value);
    }

    /**
     * Sets a value
     * @param key The key to set
     * @param value The new value
     */
    private static void set(JSONObject obj, String key, Object value) {
        try {
            if (key.contains(":")) {
                String[] pair = key.split(":", 2);
                if (!obj.has(pair[0])) {
                    obj.put(pair[0], new JSONObject());
                }
                set(obj.getJSONObject(pair[0]), pair[1], value);
                return;
            }

            obj.put(key, value);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void writeObject(ObjectOutputStream oos)
            throws IOException {
        // default serialization
        //oos.defaultWriteObject();
        oos.writeObject(JSON.toString());
    }

    private void readObject(ObjectInputStream ois)
            throws ClassNotFoundException, IOException {
        // default deserialization
        //ois.defaultReadObject();
        try {
            JSON = new JSONObject((String)ois.readObject());
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
