package com.silktours.android;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.os.AsyncTask;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.silktours.android.database.Tour;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.util.HashSet;

/**
 * Created by yongqiangfan on 2/6/17.
 */

public class MyToursAdapter extends ArrayAdapter<Tour>{

    private TextView txtCity;
    private TextView txtName;
    private ImageView imgProfile;
    private HashSet<Integer> foundImages = new HashSet<>();
    public MyToursAdapter(Context context, Tour[] tours) {
        super(context, 0, tours);
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        LayoutInflater tourInflater = LayoutInflater.from(getContext());
        final View tourView = tourInflater.inflate(R.layout.my_tours_item, parent, false);

        final Tour tour = getItem(position);

        txtCity = (TextView) tourView.findViewById(R.id.txtCity);
        txtName = (TextView) tourView.findViewById(R.id.txtName);
        imgProfile = (ImageView) tourView.findViewById(R.id.imgProfile);

        txtCity.setText(tour.getStr("address:city"));
        txtName.setText(tour.getStr("name"));

        if (foundImages.contains(0))
            return tourView;

        new AsyncTask<Void, Void, Bitmap>() {
            @Override
            protected Bitmap doInBackground(Void... params) {
                try {
                    foundImages.add(position);
                    //return getResizedBitmap(getBitmapFromURL(tour.getStr("profile_image")), 200, 200);
                    return getBitmapFromURL(tour.getStr("profile_image"));
                } catch (Exception e) {
                    Log.e("MytourAdapter", "doInBackground: ", e);
                }
                return null;
            }

            @Override
            protected void onPostExecute(Bitmap response) {
                imgProfile.setImageBitmap(response);
            }
        }.execute();


        return tourView;
    }

    public Bitmap getBitmapFromURL(String src) {
        try {
            java.net.URL url = new java.net.URL(src);
            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return BitmapFactory.decodeStream(input);
        } catch (IOException e) {
            e.printStackTrace();
            return BitmapFactory.decodeResource(MainActivity.getInstance().getApplication().getResources(),R.mipmap.ic_launcher);
        }
    }

    public Bitmap getResizedBitmap(Bitmap bm, int newWidth, int newHeight) {
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
