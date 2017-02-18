package com.silktours.android;

import android.os.Bundle;
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

import com.silktours.android.database.Tour;
import com.silktours.android.utils.LocationPrompt;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.IOException;
import java.net.URL;

public class CreateTour extends Fragment {

    private View rootView;
    private Tour tour = new Tour();
    private EditText tourName;
    private EditText tourDesc;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.content_create_tour, container, false);
        tourName = (EditText) rootView.findViewById(R.id.tourName);
        tourDesc = (EditText) rootView.findViewById(R.id.tourDesc);
        setUpListeners();
        return rootView;
    }

    private void setUpListeners() {
        /*
        ImageButton locationEdit = (ImageButton) rootView.findViewById(R.id.locationEdit);
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
        */
        Button createTour = (Button) rootView.findViewById(R.id.createTour);
        createTour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (tour == null) return;
                tour.set(Tour.name, tourName.getText().toString());
                tour.set(Tour.description, tourDesc.getText().toString());
               // Log.d("json", "onClick: " + tour.get());
                commitTour();
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
}
