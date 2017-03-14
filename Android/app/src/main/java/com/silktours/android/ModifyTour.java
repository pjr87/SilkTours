package com.silktours.android;

import android.app.DatePickerDialog;
import android.graphics.drawable.Drawable;
import android.location.Location;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.silktours.android.database.Tour;
import com.silktours.android.utils.LocationPrompt;

import org.json.JSONException;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Calendar;

public class ModifyTour extends Fragment implements OnMapReadyCallback, GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener {

    private View rootView;
    private Tour tour = new Tour();
    private EditText tourName;
    private EditText tourDesc;
    private TextView startDateText, endDateText, addedLocationText;
    private Integer tourId = 1;
    private Button startDateBtn, endDateBtn;
    private Calendar start = Calendar.getInstance();
    private Calendar end = Calendar.getInstance();
    private GoogleMap mGoogleMap;
    private MapView mMapView;
    private DateFormat formatDate = DateFormat.getDateInstance();

    //TODO fill modify tour page when opened


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.content_modify_tour, container, false);
        tourName = (EditText) rootView.findViewById(R.id.tourName);
        tourDesc = (EditText) rootView.findViewById(R.id.tourDesc);
        startDateBtn = (Button) rootView.findViewById(R.id.startDate);
        endDateBtn = (Button) rootView.findViewById(R.id.endDate);
        startDateText = (TextView) rootView.findViewById(R.id.startDateTextView);
        endDateText = (TextView) rootView.findViewById(R.id.endDateTextView);
        addedLocationText = (TextView) rootView.findViewById(R.id.addedLocations);

        filloutFields(tourId);

        initMap();
        setUpListeners();
        return rootView;
    }

    private void initMap() {
        if(mGoogleMap == null) {
            SupportMapFragment mapFrag = (SupportMapFragment) getChildFragmentManager().findFragmentById(R.id.mapFragment);
            mapFrag.getMapAsync(this);
        }
        else
            setUpMap();
    }


    private void setUpMap(){
        LatLng sydney = new LatLng(39.956208, -75.191730);
        mGoogleMap.addMarker(new MarkerOptions().position(sydney).title("Marker"));
        mGoogleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(sydney, 16));
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mGoogleMap = googleMap;
        setUpMap();
    }

    private void setUpListeners() {

        Button locationEdit = (Button) rootView.findViewById(R.id.addLocation);
        locationEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new LocationPrompt(MainActivity.getInstance(), new LocationPrompt.OnLocationSetListener() {
                    @Override
                    public void onLocationSet(String location) {
                        if (location != null) {
                            TextView locationView = (TextView) rootView.findViewById(R.id.addedLocations);
                            locationView.setText(addedLocationText.getText()+location+"\n");
                        }
                    }
                });
            }
        });

        Button modifyTour = (Button) rootView.findViewById(R.id.createTour);
        modifyTour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (tour == null) return;
                tour.set(Tour.name, tourName.getText().toString());
                tour.set(Tour.description, tourDesc.getText().toString());
                tour.set( ""+Tour.id_tour, tourId);
                //Log.d("json", "onClick: " + tour.get());
                commitTour();
            }
        });

        startDateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateStartDate();
            }
        });
        endDateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateEndDate();
            }
        });
    }

    private void updateStartDate(){
        new DatePickerDialog(rootView.getContext(), startDatePicker, start.get(Calendar.YEAR),start.get(Calendar.MONTH),start.get(Calendar.DAY_OF_MONTH)).show();
    }
    private void updateEndDate(){
        new DatePickerDialog(rootView.getContext(), endDatePicker, end.get(Calendar.YEAR),end.get(Calendar.MONTH),end.get(Calendar.DAY_OF_MONTH)).show();
    }

    DatePickerDialog.OnDateSetListener startDatePicker = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
            start.set(Calendar.YEAR, year);
            start.set(Calendar.MONTH, monthOfYear);
            start.set(Calendar.DAY_OF_MONTH, dayOfMonth);
            startDateText.setText(formatDate.format(start.getTime()));
        }
    };
    DatePickerDialog.OnDateSetListener endDatePicker = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
            end.set(Calendar.YEAR, year);
            end.set(Calendar.MONTH, monthOfYear);
            end.set(Calendar.DAY_OF_MONTH, dayOfMonth);
            if(!start.before(end))
                Toast.makeText(view.getContext(), "End Date Cannot Be Before Start Date", Toast.LENGTH_SHORT).show();
            else
                endDateText.setText(formatDate.format(end.getTime()));
    }};

    private void filloutFields(final int tourID) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                Tour tour;
                final Drawable profileImage;
                try {
                    tour = Tour.getById(tourID);
                    //URL thumb_u = new URL(user.getStr(user.PROFILE_PICTURE));
                    //profileImage = Drawable.createFromStream(thumb_u.openStream(), "src");
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                    return;
                }
                ModifyTour.this.tour = tour;
                updateFieldsOnURThread();
            }
        }).start();
    }

    private void updateFieldsOnURThread() {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                //if (profileImageDrawable != null)
                 //   profileImage.setImageDrawable(profileImageDrawable);
                tourName.setText(tour.getStr(Tour.name));
                tourDesc.setText(tour.getStr(Tour.description));
                // try {
                //    location.setText(user.getStr("address:street"));
               // } catch (Exception e) {
                //    e.printStackTrace();
                //}
            }
        });
    }

    private void commitTour() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    tour.commitModify();
                    postCommitModify(false);
                } catch (IOException e) {
                    postCommitModify(true);
                    e.printStackTrace();
                }

            }
        }).start();
    }
    private void postCommitModify(final boolean error) {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!error) {
                    Toast.makeText(MainActivity.getInstance(),
                            "Tour Modified successfully",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MainActivity.getInstance(),
                            "Tour could not be Modified",
                            Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    @Override
    public void onConnected(@Nullable Bundle bundle) {

    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    @Override
    public void onLocationChanged(Location location) {

    }
}
