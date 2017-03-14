package com.silktours.android;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.silktours.android.database.Tours;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;

public class Viewtour extends Fragment implements OnMapReadyCallback{

    private Tours tour;
    private TextView txtName;
    private TextView txtCity;
    private TextView txtCountry;
    private TextView txtPrice;
    private TextView txtStartDate;
    private TextView txtEndDate;
    private TextView txtDescription;
    private ImageView imgProfile;
    private GoogleMap googleMap;
    private MapView mapView;
    private Double[][] stops;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.content_viewtour, container, false);
        tour = (Tours) getArguments().getSerializable("TourObject");

        txtName = (TextView) rootView.findViewById(R.id.txtName);
        txtCountry = (TextView) rootView.findViewById(R.id.txtCountry);
        txtCity = (TextView) rootView.findViewById(R.id.txtCity);
        txtPrice = (TextView) rootView.findViewById(R.id.txtPrice);
        txtStartDate = (TextView) rootView.findViewById(R.id.txtStartDate);
        txtEndDate = (TextView) rootView.findViewById(R.id.txtEndDate);
        txtDescription = (TextView) rootView.findViewById(R.id.txtDescription);
        imgProfile = (ImageView) rootView.findViewById(R.id.imgProfile);
        mapView = (MapView) rootView.findViewById(R.id.mapView);
        mapView.onCreate(savedInstanceState);

        mapView.onResume(); // needed to get the map to display immediately

        try {
            MapsInitializer.initialize(getActivity().getApplicationContext());
        } catch (Exception e) {
            e.printStackTrace();
        }

        mapView.getMapAsync(this);

        getInfo();

        return rootView;
    }


    @Override
    public void onMapReady(GoogleMap googleMap) {
        stops = tour.getStops();
        for(int i = 0; i < stops.length; i++) {
            LatLng sydney = new LatLng(stops[i][0], stops[i][1]);
            googleMap.addMarker(new MarkerOptions().position(sydney).title("Marker Title").snippet("Marker Description"));

            // For zooming automatically to the location of the marker
            CameraPosition cameraPosition = new CameraPosition.Builder().target(sydney).zoom(12).build();
            googleMap.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition));
        }

    }

    private void getInfo() {
        txtName.setText(tour.getName());
        txtCity.setText(tour.getCity());
        txtPrice.setText(tour.getPrice());
        txtStartDate.setText(tour.getStartDate());
        txtEndDate.setText(tour.getEndDate());
        txtDescription.setText(tour.getDescription() + " " + tour.getStops()[0][0] + " " + tour.getStops()[0][1]);
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
    }


    private Bitmap getBitmapFromURL(String src) {
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

    private Bitmap getResizedBitmap(Bitmap bm, int newWidth, int newHeight) {
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