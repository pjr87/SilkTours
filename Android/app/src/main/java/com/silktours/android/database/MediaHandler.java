package com.silktours.android.database;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.os.AsyncTask;
import android.util.Base64;
import android.util.Log;

import com.silktours.android.MainActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.util.UUID;

import static android.content.ContentValues.TAG;

/**
 * Created by yongqiangfan on 4/15/17.
 */

public class MediaHandler {
    private static Media[] medias;
    private static String selectedImagePath;
    private static final int SELECT_PICTURE = 1;

    private static class GetMediaWithTourId extends AsyncTask<Void, Void, String> {
        private String tourId;

        protected GetMediaWithTourId(String tourId) {
            this.tourId = tourId;
        }
        @Override
        protected String doInBackground(Void... params) {

            try {
                Log.d(TAG, "doInBackground: try to get media from" + tourId);
                return Controller.sendGet("/media/" + tourId);
            } catch (Exception e) {
                Log.e(TAG, "doInBackground: ", e);
            }
            return null;
        }

        @Override
        protected void onPostExecute(String response) {
            try {
                JSONArray jsArray = new JSONArray(response);
                Log.d(TAG, "doInBackground: " + jsArray.length());
                medias = new Media[jsArray.length()];
                for(int i = 0; i < jsArray.length(); i++) {
                    medias[i] = new Media(jsArray.getJSONObject(i));
                }
            } catch (Exception e) {
                Log.e(TAG, "onPostExecute: ", e);
            }
        }
    }

    private static class PostMediaWithTourId extends AsyncTask<Void, Void, String> {
        private JSONObject json;
        private String charset = "UTF-8";
        private HttpURLConnection httpConn;
        private OutputStream outputStream;
        private PrintWriter writer;

        protected PostMediaWithTourId(String tourId, Bitmap image) throws IOException, JSONException {
            this.json = Base64Encoder(image);
            URL url = new URL(Common.SERVER_URL + "/media/" + tourId);
            httpConn = (HttpURLConnection) url.openConnection();
            httpConn.setUseCaches(false);
            httpConn.setDoOutput(true); // indicates POST method
            httpConn.setDoInput(true);
            httpConn.setRequestProperty("Content-Type", "application/json");
            httpConn.setRequestProperty("Accept", "application/json");
            httpConn.setRequestMethod("POST");
        }

        @Override
        protected String doInBackground(Void... params) {
            try {
                outputStream = httpConn.getOutputStream();
                writer = new PrintWriter(new OutputStreamWriter(outputStream, charset),
                        true);
                writer.write(json.toString());
                writer.flush();
                StringBuilder sb = new StringBuilder();
                int HttpResult = httpConn.getResponseCode();
                if (HttpResult == HttpURLConnection.HTTP_OK) {
                    BufferedReader br = new BufferedReader(
                            new InputStreamReader(httpConn.getInputStream(), "utf-8"));
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line + "\n");
                    }
                    br.close();
                    return sb.toString();
                } else {
                    return  httpConn.getResponseMessage();
                }
            } catch (Exception e) {
                // TODO: something
            }
            return null;
        }

        @Override
        protected void onPostExecute(String s) {
            Log.d(TAG, "onPostExecute: upload image: " + s);

        }


    }

    private static class PutMediaWithId extends AsyncTask<Void, Void, String> {
        private JSONObject json;
        private String charset = "UTF-8";
        private HttpURLConnection httpConn;
        private OutputStream outputStream;
        private PrintWriter writer;

        protected PutMediaWithId(String position, String id, Bitmap image) throws IOException, JSONException{
            this.json = Base64Encoder(image);
            URL url = new URL(Common.SERVER_URL + "/" + position + "/" + id + "/profile?bypass=true");
            httpConn = (HttpURLConnection) url.openConnection();
            httpConn.setUseCaches(false);
            httpConn.setDoOutput(true); // indicates POST method
            httpConn.setDoInput(true);
            httpConn.setRequestProperty("Content-Type", "application/json");
            httpConn.setRequestProperty("Accept", "application/json");
            httpConn.setRequestMethod("PUT");
        }

        protected String doInBackground(Void... params) {
            try {
                outputStream = httpConn.getOutputStream();
                writer = new PrintWriter(new OutputStreamWriter(outputStream, charset),
                        true);
                writer.write(json.toString());
                writer.flush();
                StringBuilder sb = new StringBuilder();
                int HttpResult = httpConn.getResponseCode();
                if (HttpResult == HttpURLConnection.HTTP_OK) {
                    BufferedReader br = new BufferedReader(
                            new InputStreamReader(httpConn.getInputStream(), "utf-8"));
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line + "\n");
                    }
                    br.close();
                    return sb.toString();
                } else {
                    return  httpConn.getResponseMessage();
                }
            } catch (Exception e) {
                // TODO: something
            }
            return null;
        }

        protected void onPostExecute(String s) {
            Log.d(TAG, "onPostExecute: upload profile image: " + s);

        }
    }

    public static Media[] getMediaWithTourId(final String tourId) {
        new GetMediaWithTourId(tourId).execute();
        return medias;
    }

    public static void uploadMedia(String tourId, Bitmap image) {
        try {
            new PostMediaWithTourId(tourId, image).execute();
        } catch (Exception e) {
            // TODO: something
        }

    }

    public static void uploadProfileImage(String position, String id, Bitmap image) {
        try {
            new PutMediaWithId(position, id, image).execute();
        } catch (Exception e) {
            Log.e(TAG, "uploadProfileImage: ", e);
        }

    }

    public static JSONObject Base64Encoder(Bitmap image) throws JSONException{
        int bytes = image.getByteCount();
        ByteBuffer buffer = ByteBuffer.allocate(bytes); //Create a new buffer
        image.copyPixelsToBuffer(buffer); //Move the byte data to the buffer
        byte[] byteArrayImage = buffer.array();
        String encodedImage = Base64.encodeToString(byteArrayImage, Base64.DEFAULT);
        JSONObject js = new JSONObject();
        js.put("name", UUID.randomUUID() + ".jpg");
        js.put("file", encodedImage);
        return js;
    }

    public static String chooseFile() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        MainActivity.getInstance().startActivityForResult(Intent.createChooser(intent,
                "Select Picture"), SELECT_PICTURE);
        return null;
    }

    public static Bitmap getBitmapFromURL(String src) {
        try {
            java.net.URL url = new java.net.URL(src);
            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Bitmap getResizedBitmap(Bitmap bm, int newWidth, int newHeight) {
        if (bm == null) return null;
        int width = bm.getWidth();
        int height = bm.getHeight();
        float scaleWidth = ((float) newWidth) / width;
        float scaleHeight = ((float) newHeight) / height;

        Matrix matrix = new Matrix();
        matrix.postScale(scaleWidth, scaleHeight);

        Bitmap resizedBitmap = Bitmap.createBitmap(bm, 0, 0, width, height, matrix, false);
        bm.recycle();
        return resizedBitmap;
    }
}
