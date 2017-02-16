package com.silktours.android.database;

import android.util.Log;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import static android.content.ContentValues.TAG;

/**
 * Created by yongqiangfan on 2/6/17.
 */

public class Controller {

    private static String serverIP = Common.SERVER_URL;
    private final static String USER_AGENT = "Mozilla/5.0";

    public static String sendGet(String path) throws Exception {
        URL url = new URL(serverIP + path);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        Log.d(TAG, "\nSending GET request to URL : " + serverIP + path);
        Log.d(TAG, "Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return response.toString();

    }
}
