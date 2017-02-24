package com.silktours.android.database;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by andrew on 1/26/17.
 */
public class Common {
    public static final String SERVER_URL = "http://34.197.42.24:5000";

    public static String httpRequest(String urlString) throws IOException, JSONException {
        /*HttpURLConnection urlConnection = null;
        URL url = new URL(urlString);

        urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");
        urlConnection.setReadTimeout(10000);
        urlConnection.setConnectTimeout(15000);
        urlConnection.setDoOutput(true);
        urlConnection.connect();

        BufferedReader br=new BufferedReader(
                new InputStreamReader(
                        urlConnection.getInputStream()
                )
        );*/

        URL url = new URL(urlString);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        try {
            InputStream in = new BufferedInputStream(urlConnection.getInputStream());
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line+"\n");
            }
            br.close();
            return sb.toString();
        } finally {
            urlConnection.disconnect();
        }


    }

    public static JSONObject getJson(String urlString) throws IOException, JSONException {
        return new JSONObject(httpRequest(urlString));
    }

    public static JSONArray getJsonArray(String urlString) throws IOException, JSONException {
        return new JSONArray(httpRequest(urlString));
    }

    public static String makePUT(String uri, String json) throws IOException {
        HttpURLConnection httpcon = (HttpURLConnection) ((new URL (uri).openConnection()));
        httpcon.setDoOutput(true);
        httpcon.setRequestProperty("Content-Type", "application/json");
        httpcon.setRequestProperty("Accept", "application/json");
        httpcon.setRequestMethod("PUT");
        httpcon.connect();

        //Write
        OutputStream os = httpcon.getOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));
        writer.write(json);
        writer.close();
        os.close();

        //Read
        BufferedReader br = new BufferedReader(new InputStreamReader(httpcon.getInputStream(),"UTF-8"));

        String line = null;
        StringBuilder sb = new StringBuilder();

        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

        br.close();
        String result = sb.toString();
        return result;
    }
}
