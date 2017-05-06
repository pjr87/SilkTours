package com.silktours.android;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.location.places.ui.PlaceAutocompleteFragment;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.UiSettings;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polygon;
import com.google.android.gms.maps.model.PolygonOptions;
import com.silktours.android.database.Tour;
import com.silktours.android.database.User;
import com.silktours.android.utils.CredentialHandler;
import com.silktours.android.utils.LocationPrompt;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.security.PrivateKey;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static android.content.ContentValues.TAG;
import static com.silktours.android.R.id.login_progress_layout;
import static com.silktours.android.R.id.status;
import static com.silktours.android.R.id.stopsList;

public class CreateTour extends Fragment implements DatePickerDialog.OnDateSetListener, OnMapReadyCallback, GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener {

    private View rootView;
    private Tour tour = new Tour();
    private EditText tourName, tourDesc, price, language, additionalAccommodation, additionalTransport, additionalFood;
    private TextView startDateText, endDateText, addedLocationText;
    private ListView stopsList;
    private Button startDateBtn, endDateBtn, profilePicButton;
    private Calendar start = Calendar.getInstance();
    private Calendar end = Calendar.getInstance();
    private GoogleMap mGoogleMap;
    private MapView mMapView;
    private DateFormat formatDate = DateFormat.getDateInstance();
    private Place placeSelected;

    public static final int GET_FROM_GALLERY = 3;

    ArrayList<String> stops = new ArrayList<String>();
    ArrayAdapter<String> stopsAdapter;

    ImageView ivCamera, ivGallery, ivUpload, ivImage;
    JSONArray stopJSON = new JSONArray();

    private CredentialHandler credentialHandler;
    private User user;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.content_create_tour, container, false);

        //user = CredentialHandler.getUser(MainActivity.getInstance());
        user = CredentialHandler.getUser(this.getActivity());
        //user = User.getByID(Profile.);


        //Log.d("user", String.valueOf(user.getInt(user.ID_USERS)));
        //Log.d("user", user.ID_USERS.toString());
        tourName = (EditText) rootView.findViewById(R.id.tourName);
        tourDesc = (EditText) rootView.findViewById(R.id.tourDesc);
        price = (EditText) rootView.findViewById(R.id.price);
        language = (EditText) rootView.findViewById((R.id.language));
        startDateBtn = (Button) rootView.findViewById(R.id.startDate);
        endDateBtn = (Button) rootView.findViewById(R.id.endDate);
        startDateText = (TextView) rootView.findViewById(R.id.startDateTextView);
        endDateText = (TextView) rootView.findViewById(R.id.endDateTextView);
        addedLocationText = (TextView) rootView.findViewById(R.id.addedLocations);
        additionalAccommodation = (EditText) rootView.findViewById((R.id.additionalAccommodation));
        additionalTransport = (EditText) rootView.findViewById((R.id.additionalTransport));
        additionalFood = (EditText) rootView.findViewById((R.id.additionalFood));
        profilePicButton = (Button) rootView.findViewById(R.id.profilePicButton);

        stopsList = (ListView) rootView.findViewById(R.id.stopsList);
        stopsAdapter = new ArrayAdapter<String>(this.getContext(), R.layout.tours_stops_list, stops);
        stopsList.setAdapter(stopsAdapter);

        initMap();
        setUpListeners();
        return rootView;
    }

    private void initMap() {
        if (mGoogleMap == null) {
            SupportMapFragment mapFrag = (SupportMapFragment) getChildFragmentManager().findFragmentById(R.id.mapFragment);
            mapFrag.getMapAsync(this);
        } else
            setUpMap();
    }


    private void setUpMap() {
        //LatLng sydney = new LatLng(39.956208, -75.191730);
        //mGoogleMap.addMarker(new MarkerOptions().position(sydney).title("Marker"));
        //mGoogleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(sydney, 16));
       // if (ActivityCompat.checkSelfPermission(rootView.getContext(), android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(rootView.getContext(), android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            //Toast.makeText(rootView.getContext(), "End Date Cannot Be Before Start Date", Toast.LENGTH_SHORT).show();

          //  return;
        //}
        //mGoogleMap.setMyLocationEnabled(true);
        //.setZoomControlsEnabled(true);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mGoogleMap = googleMap;
        setUpMap();
    }

    public static void setListViewHeightBasedOnChildren(ListView listView) {
        ListAdapter listAdapter = listView.getAdapter();
        if (listAdapter == null) {
            // pre-condition
            return;
        }

        int totalHeight = 0;
        for (int i = 0; i < listAdapter.getCount(); i++) {
            View listItem = listAdapter.getView(i, null, listView);
            listItem.measure(0, 0);
            totalHeight += listItem.getMeasuredHeight();
        }

        ViewGroup.LayoutParams params = listView.getLayoutParams();
        params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
        listView.setLayoutParams(params);
        listView.requestLayout();
    }

    private void setUpListeners() {

        //TODO make stops table have an address name with the stops id
        Button locationEdit = (Button) rootView.findViewById(R.id.addLocation);
        locationEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new LocationPrompt(MainActivity.getInstance(), new LocationPrompt.OnLocationSetListener() {
                    @Override
                    public void onLocationSet(String location, Place place) {
                        if (location != null) {
                            //TextView locationView = (TextView) rootView.findViewById(R.id.addedLocations);
                            //locationView.setText(addedLocationText.getText()+location+"\n");
                            stops.add((String) place.getName());
                            setListViewHeightBasedOnChildren(stopsList);
                            stopsAdapter.notifyDataSetChanged();
                            Log.d("STOPSSSSSSSSSS", stops.toString());
                            placeSelected = place;
                            LatLng loca = placeSelected.getLatLng();
                            mGoogleMap.addMarker(new MarkerOptions().position(loca));
                            mGoogleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(loca, 14));

                            JSONObject stop = new JSONObject();

                            try {
                                stop.put("lat", loca.latitude);
                                stop.put("lon", loca.longitude);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            stopJSON.put(stop);
                            Log.d("stopsJSON", stopJSON.toString());
                        }
                    }
                });
            }
        });

        Button createTour = (Button) rootView.findViewById(R.id.createTour);
        createTour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (tour == null) return;
                tour.set(Tour.name, tourName.getText().toString());
                tour.set(Tour.description, tourDesc.getText().toString());
                tour.set("price", price.getText().toString());
                //TODO make it 0 by default in the backend(average rating)
                tour.set("average_rating", 0);
                tour.set("firstStart_date", start.get(Calendar.YEAR)+"-"+start.get(Calendar.MONTH)+"-"+start.get(Calendar.DATE));
                tour.set("firstEnd_date", end.get(Calendar.YEAR)+"-"+end.get(Calendar.MONTH)+"-"+end.get(Calendar.DATE));
                tour.set("language", language.getText().toString());
                tour.set("additional_food", additionalFood.getText().toString());
                tour.set("additional_accomadation", additionalAccommodation.getText().toString());
                tour.set("additional_transport", additionalTransport.getText().toString());

                JSONArray guides = new JSONArray();
                JSONObject guide = new JSONObject();
                try {
                    guide.put("id_user", String.valueOf(user.getInt(user.ID_USERS)));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                guides.put(guide);
                //Log.d("USER IDDDDDDDDDDDDDD", user.ID_USERS.toString());
                //Log.d("user iddddddddddddd", user.getStr(user.ID_USERS));
                tour.set("guides", guides);

                tour.set("stops", stopJSON);

               // Log.d("json", "onClick: " + tour.get());
                commitTour();

                /*
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
                */
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

        stopsList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> a, View v, int position, long id) {
                AlertDialog.Builder adb=new AlertDialog.Builder(MainActivity.getInstance());
                adb.setTitle("Delete?");
                adb.setMessage("Are you sure you want to delete " + position);
                final int positionToRemove = position;
                adb.setNegativeButton("Cancel", null);
                adb.setPositiveButton("Ok", new AlertDialog.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        stops.remove(positionToRemove);
                        setListViewHeightBasedOnChildren(stopsList);
                        stopsAdapter.notifyDataSetChanged();
                    }});
                adb.show();
            }
        });

        profilePicButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //startActivityForResult(galleryPhoto.openGalleryIntent(), GALLERY_REQUEST);
                //startActivityForResult(new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.INTERNAL_CONTENT_URI), GET_FROM_GALLERY);
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), GET_FROM_GALLERY);
                Log.d("fool", "lol");
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

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


        //Detects request codes
        if(requestCode==GET_FROM_GALLERY && resultCode == Activity.RESULT_OK) {
            Uri selectedImage = data.getData();
            Log.d("image", selectedImage.toString());
            Bitmap bitmap = null;
            try {
                bitmap = MediaStore.Images.Media.getBitmap(this.getContext().getContentResolver(), selectedImage);
                ImageView testProfilePicView = (ImageView) rootView.findViewById (R.id.testProfilePicView);
                testProfilePicView.setImageBitmap(bitmap);
            } catch (FileNotFoundException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    private void commitTour() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    tour.commitCreate();
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
    @Override
    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {

    }


}
