package com.silktours.android;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.silktours.android.database.Controller;
import com.silktours.android.database.Media;
import com.silktours.android.database.MediaHandler;
import com.silktours.android.database.Tour;
import com.silktours.android.database.Tours;
import com.silktours.android.database.User;
import com.silktours.android.utils.CredentialHandler;
import com.silktours.android.utils.ErrorDisplay;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.util.ArrayList;

import static android.content.ContentValues.TAG;

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
    private LinearLayout lnlMedia;
    private Double[][] stops;
    private String tourId;
    private Media[] medias;
    private Tour _tour;

    public static void start(Tour tour) {
        Bundle args = new Bundle();
        args.putSerializable("TourObject", tour);
        Viewtour fragment = new Viewtour();
        fragment.setArguments(args);
        MainActivity.getInstance().getMenu().startFragment(fragment, 1);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.content_viewtour, container, false);
        Tour _tour = (Tour) getArguments().getSerializable("TourObject");
        try {
            tour = new Tours(_tour.JSON);
        } catch (JSONException e) {
            e.printStackTrace();
            ErrorDisplay.show("Issue displaying tour", MainActivity.getInstance());
            return rootView;
        }
        tourId = tour.getId_tour().toString();
        txtName = (TextView) rootView.findViewById(R.id.txtName);
        txtCountry = (TextView) rootView.findViewById(R.id.txtCountry);
        txtCity = (TextView) rootView.findViewById(R.id.txtCity);
        txtPrice = (TextView) rootView.findViewById(R.id.txtPrice);
        txtStartDate = (TextView) rootView.findViewById(R.id.txtStartDate);
        txtEndDate = (TextView) rootView.findViewById(R.id.txtEndDate);
        txtDescription = (TextView) rootView.findViewById(R.id.txtDescription);
        imgProfile = (ImageView) rootView.findViewById(R.id.imgProfile);
        lnlMedia = (LinearLayout) rootView.findViewById(R.id.lnlMedia);
        mapView = (MapView) rootView.findViewById(R.id.mapView);
        mapView.onCreate(savedInstanceState);

        mapView.onResume(); // needed to get the map to display immediately

        Button createTourButton = (Button) rootView.findViewById(R.id.modifyTour);
        createTourButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    ModifyTour.start(tour);
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });


        try {
            MapsInitializer.initialize(getActivity().getApplicationContext());
        } catch (Exception e) {
            e.printStackTrace();
        }

        mapView.getMapAsync(this);

        getInfo();

        (rootView.findViewById(R.id.btnMessage)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            int guide_id = tour.getJSON().getJSONArray("guides").getJSONObject(0).getInt("id_user");
                            User guide = User.getByID(guide_id);
                            startMessaging(guide);
                        } catch (IOException | JSONException | NullPointerException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
            }
        });

        (rootView.findViewById(R.id.btnJoin)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                User user = CredentialHandler.getUser(MainActivity.getInstance());
                if (user == null) {
                    MainActivity.getInstance().logoutWithMessage(Viewtour.this);
                    return;
                } else {
                    Tour _tour = new Tour();
                    _tour.JSON = tour.getJSON();
                    BookTourFragment.start(_tour, user);
                }
            }
        });

        rootView.findViewById(R.id.btnViewProfile).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    Profile profile = new Profile();
                    Bundle args = new Bundle();
                    int guide_id = tour.JSON.getJSONArray("guides").getJSONObject(0).getInt("id_user");
                    args.putInt("id_user", guide_id);
                    profile.setArguments(args);
                    MainActivity.getInstance().getMenu().startFragment(profile, 0);
                } catch (JSONException | NullPointerException e) {
                    e.printStackTrace();
                }
            }
        });

        return rootView;
    }

    private void startMessaging(final User guide) {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                MainActivity.getInstance().launchMessaging(guide);
            }
        });
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
        txtDescription.setText(tour.getDescription());
        new AsyncTask<Void, Void, Bitmap>() {
            @Override
            protected Bitmap doInBackground(Void... params) {
                return getResizedBitmap(getBitmapFromURL(tour.getProfileImage()), 200, 200);
            }

            @Override
            protected void onPostExecute(Bitmap response) {
                if (response != null)
                    imgProfile.setImageBitmap(response);
            }
        }.execute();
        getMedia(tourId);

    }

    public void getMedia(final String tourId) {
        new AsyncTask<Void, Void, ArrayList<Bitmap>>() {
            @Override
            protected ArrayList<Bitmap> doInBackground(Void... params) {

                try {
                    String response =  Controller.sendGet("/media/" + tourId + "?bypass=true");
                    JSONArray jsArray = new JSONArray(response);
                    Log.d(TAG, "doInBackground: " + jsArray.length());
                    medias = new Media[jsArray.length()];
                    for(int i = 0; i < jsArray.length(); i++) {
                        medias[i] = new Media(jsArray.getJSONObject(i));
                    }
                    ArrayList<Bitmap> bitmaps = new ArrayList<>(medias.length);
                    for (int i = 0; i < medias.length; i++) {
                        bitmaps.add(medias[i].getDisplayRank()-1, getBitmapFromURL(medias[i].getUrl()));
                    }
                    return bitmaps;
                } catch (Exception e) {
                    Log.e(TAG, "doInBackground: ", e);
                }
                return null;
            }

            @Override
            protected void onPostExecute(ArrayList<Bitmap> response) {
                try {
                    for (int i = 0; i < response.size(); i++) {
                        ImageView imageView = new ImageView(MainActivity.getInstance());
                        imageView.setImageBitmap(getResizedBitmap(response.get(i), 200, 200));
                        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,
                                ViewGroup.LayoutParams.WRAP_CONTENT);
                        imageView.setLayoutParams(layoutParams);
                        lnlMedia.addView(imageView);
                        Log.d(TAG, "onPostExecute: ");
                    }

                } catch (Exception e) {
                    Log.e(TAG, "onPostExecute: ", e);
                }
                Bitmap bitmao = BitmapFactory.decodeResource(MainActivity.getInstance().getResources(), R.drawable.ic_message_bubble1);
                try {
                    MediaHandler.uploadProfileImage("tours", "2", bitmao);
                } catch (Exception e ) {
                    Log.e(TAG, "onPostExecute: ", e);
                }

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