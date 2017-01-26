package com.silktours.android.database;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by andrew on 1/26/17.
 */
public class Common {
    public static final String SERVER_URL = "http://34.197.42.24:5000";

    public static String httpRequest(String urlString) throws IOException, JSONException {
        HttpURLConnection urlConnection = null;

        URL url = new URL(urlString);

        urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");
        urlConnection.setReadTimeout(10000);
        urlConnection.setConnectTimeout(15000);
        urlConnection.setDoOutput(true);
        urlConnection.connect();

        BufferedReader br=new BufferedReader(new InputStreamReader(url.openStream()));

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line+"\n");
        }
        br.close();
        return sb.toString();
    }

    public static JSONObject getJson(String urlString) throws IOException, JSONException {
        return new JSONObject(httpRequest(urlString));
    }

    public static JSONArray getJsonArray(String urlString) throws IOException, JSONException {
        return new JSONArray(httpRequest(urlString));
    }
}
