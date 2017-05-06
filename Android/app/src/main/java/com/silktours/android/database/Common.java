package com.silktours.android.database;

import android.util.Log;

import com.silktours.android.MainActivity;
import com.silktours.android.utils.CredentialHandler;

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
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

/**
 * Created by andrew on 1/26/17.
 */
public class Common {
    /**
     * The base url string
     */
    public static final String SERVER_URL = "http://silk-tours-dev.us-east-1.elasticbeanstalk.com";

    /**
     * Adds auth headers to a Http connection
     * @param conn
     */
    private static void addAuth(HttpURLConnection conn) {

        if (CredentialHandler.logins != null &&
                CredentialHandler.identityId != null &&
                !CredentialHandler.logins.isEmpty() &&
                !CredentialHandler.identityId.isEmpty()) {
            Log.d("Logins", CredentialHandler.logins);
            Log.d("identityPoolId", CredentialHandler.identityId);
            conn.setRequestProperty("Silk-Logins", CredentialHandler.logins);
            conn.setRequestProperty("Silk-Identity-Id", CredentialHandler.identityId);
        }
        //conn.setRequestProperty("Silk-Bypass", "true");
    }

    /**
     * Performs a get request to the given url
     * @param urlString
     * @return The string result from the request. Or an error object.
     * @throws IOException
     */
    public static String httpRequest(String urlString) throws IOException, JSONException {
        URL url = new URL(urlString);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        addAuth(urlConnection);
        int responseCode = urlConnection.getResponseCode();
        if (responseCode == 403) {
            return "{\"authorized\": false}";
        }
        if (responseCode != 200) {
            Log.d("Silk", "" + responseCode);
            return "{'exists': false}";
        }
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

    /**
     * Checks if the given credentials are valid
     * @param logins The AWS login credentials to check
     * @param identityId The AWS user identity id
     * @return true if the user exists and is logged in
     */
    public static boolean checkAuth(Map<String, String> logins, String identityId) {
        try {
            JSONObject json = new JSONObject();
            json.put("Logins", new JSONObject(logins));
            json.put("IdentityId", identityId);
            String urlString = SERVER_URL + "/check_auth";
            URL url = new URL(urlString);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            addAuth(urlConnection);
            urlConnection.setRequestProperty("Content-Type", "application/json");
            urlConnection.setRequestProperty("Accept", "application/json");
            urlConnection.setRequestMethod("POST");

            OutputStream os = urlConnection.getOutputStream();
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));
            writer.write(json.toString());
            writer.close();
            os.close();

            int responseCode = urlConnection.getResponseCode();
            return responseCode == 200;
        }catch (IOException e) {
            return false;
        } catch (JSONException e) {
            return false;
        }
    }

    /**
     * Does a get request for a JSON object
     * @param urlString
     * @return
     * @throws IOException If the request could not be completed
     * @throws JSONException If the JSON was invalid
     */
    public static JSONObject getJson(String urlString) throws IOException, JSONException {
        return new JSONObject(httpRequest(urlString));
    }

    /**
     * Does a get request for a JSON array
     * @param urlString
     * @return
     * @throws IOException If the request could not be completed
     * @throws JSONException If the JSON was invalid
     */
    public static JSONArray getJsonArray(String urlString) throws IOException, JSONException {
        return new JSONArray(httpRequest(urlString));
    }

    /**
     * Does an HTTP request
     * @param uri The URI to perform the request to
     * @param json The JSON to put in the HTTP request's body
     * @param method The HTTP method to use.
     * @return The string result of the request
     * @throws IOException If the request could not be completed
     */
    public static String request(String uri, String json, String method) throws IOException {
        HttpURLConnection httpcon = (HttpURLConnection) ((new URL (uri).openConnection()));
        addAuth(httpcon);
        httpcon.setDoOutput(true);
        httpcon.setRequestProperty("Content-Type", "application/json");
        httpcon.setRequestProperty("Accept", "application/json");
        httpcon.setRequestMethod(method);
        httpcon.connect();

        if (json != null) {
            //Write
            OutputStream os = httpcon.getOutputStream();
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));
            writer.write(json);
            writer.close();
            os.close();
        }

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
