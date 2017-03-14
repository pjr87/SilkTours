package com.silktours.android;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.os.AsyncTask;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.silktours.android.database.Tours;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;

/**
 * Created by yongqiangfan on 2/6/17.
 */

public class MyToursAdapter extends ArrayAdapter<Tours>{

    private TextView txtCity;
    private TextView txtName;
    private ImageView imgProfile;

    public MyToursAdapter(Context context, Tours[] tours) {
        super(context, 0, tours);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater tourInflater = LayoutInflater.from(getContext());
        final View tourView = tourInflater.inflate(R.layout.my_tours_item, parent, false);

        final Tours tour = getItem(position);

        txtCity = (TextView) tourView.findViewById(R.id.txtCity);
        txtName = (TextView) tourView.findViewById(R.id.txtName);
        imgProfile = (ImageView) tourView.findViewById(R.id.imgProfile);

        txtCity.setText(tour.getCity());
        txtName.setText(tour.getName());

        new AsyncTask<Void, Void, Bitmap>() {
            @Override
            protected Bitmap doInBackground(Void... params) {
                return getResizedBitmap(getBitmapFromURL(tour.getProfileImage()), 200, 200);
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
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
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
