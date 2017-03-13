package com.silktours.android;

import android.graphics.Color;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polygon;
import com.google.android.gms.maps.model.PolygonOptions;
import com.silktours.android.database.Tour;
import com.silktours.android.database.User;
import com.silktours.android.utils.LocationPrompt;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.IOException;
import java.net.URL;
import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.List;

public class ModifyTour extends Fragment implements OnMapReadyCallback, GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener {

    private View rootView;
    private Tour tour = new Tour();
    private EditText tourName;
    private EditText tourDesc;
    private GoogleMap mGoogleMap;

    ArrayList<Marker> markers = new ArrayList<Marker>();
    static final int POLYGON_POINTS = 5;
    Polygon shape;

    //TODO fill modify tour page when opened


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.content_create_tour, container, false);
        tourName = (EditText) rootView.findViewById(R.id.tourName);
        tourDesc = (EditText) rootView.findViewById(R.id.tourDesc);
        setUpListeners();
        //initMap();
        // SupportMapFragment mapFragment = (SupportMapFragment) getFragmentManager().findFragmentById(R.id.mapFragment);
        //mapFragment.getMapAsync(this);
        return rootView;
    }


    private void initMap() {
        SupportMapFragment mapFragment = (SupportMapFragment) getFragmentManager().findFragmentById(R.id.mapFragment);
        mapFragment.getMapAsync(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mGoogleMap = googleMap;

        if(mGoogleMap != null){


            mGoogleMap.setOnMapLongClickListener(new GoogleMap.OnMapLongClickListener() {
                @Override
                public void onMapLongClick(LatLng latLng) {
                    ModifyTour.this.setMarker("Local", latLng.latitude, latLng.longitude);
                }
            });
        }
    }

    private void setMarker(String locality, double lat, double lng) {
//        if(marker != null){
//            removeEverything();
//        }

        if(markers.size() == POLYGON_POINTS){
            removeEverything();
        }

        MarkerOptions options = new MarkerOptions()
                .title(locality)
                .draggable(true)
                .icon(BitmapDescriptorFactory.fromResource(R.mipmap.ic_launcher))
                .position(new LatLng(lat, lng))
                .snippet("I am Here");

        markers.add(mGoogleMap.addMarker(options));

        if(markers.size() == POLYGON_POINTS){
            drawPolygon();
        }

//        if(marker1 == null) {
//            marker1 = mGoogleMap.addMarker(options);
//        } else if(marker2 == null) {
//            marker2 = mGoogleMap.addMarker(options);
//            drawLine();
//        } else {
//            removeEverything();
//            marker1 = mGoogleMap.addMarker(options);
//        }

//        circle = drawCircle(new LatLng(lat, lng));

    }

    private void drawPolygon() {
        PolygonOptions options = new PolygonOptions()
                .fillColor(0x330000FF)
                .strokeWidth(3)
                .strokeColor(Color.RED);

        for(int i=0; i<POLYGON_POINTS;i++){
            options.add(markers.get(i).getPosition());
        }
        shape = mGoogleMap.addPolygon(options);

    }

    private void removeEverything() {
        for(Marker marker : markers) {
            marker.remove();
        }
        markers.clear();
        shape.remove();
        shape = null;

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
                            TextView locationView = (TextView) rootView.findViewById(R.id.locationTextView);
                            locationView.setText(location);
                        }
                    }
                });
            }
        });

        Button createTour = (Button) rootView.findViewById(R.id.createTour);
        createTour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                if (tour == null) return;
                tour.set(Tour.name, tourName.getText().toString());
                tour.set(Tour.description, tourDesc.getText().toString());
               // Log.d("json", "onClick: " + tour.get());
                commitTour();
                */
                final User user = new User();
                user.set(User.FIRST_NAME, "Andrew");
                user.set(User.LAST_NAME, "Shidel");
                new AsyncTask<Integer, Tour, Tour>() {
                    @Override
                    protected Tour doInBackground(Integer... params) {
                        try {
                            return Tour.getById(params[0]);
                        } catch (IOException e) {
                            e.printStackTrace();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        return null;
                    }

                    @Override
                    protected void onPostExecute(Tour tour) {
                        if (tour != null) {
                            BookTourFragment.start(tour, user);
                        }
                    }
                }.execute(1);
            }
        });
    }



    private void commitTour() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    tour.commit();
                    postCommit(false);
                } catch (IOException e) {
                    postCommit(true);
                    e.printStackTrace();
                }

            }
        }).start();
    }
    private void postCommit(final boolean error) {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!error) {
                    Toast.makeText(MainActivity.getInstance(),
                            "Tour Created successfully",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MainActivity.getInstance(),
                            "Tour could not be Created",
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
