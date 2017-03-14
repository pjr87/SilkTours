package com.silktours.android.utils;

import android.app.Activity;
import android.support.v7.app.AlertDialog;
import android.content.DialogInterface;
import android.view.InflateException;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RatingBar;

import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.location.places.ui.PlaceAutocompleteFragment;
import com.google.android.gms.location.places.ui.PlaceSelectionListener;
import com.silktours.android.MainActivity;
import com.silktours.android.R;

/**
 * Created by andrew on 2/10/17.
 */
public class LocationPrompt {
    private final Activity activity;
    private AlertDialog filterDialog;
    public String selection = null;
    private static View view;
    private Place placeSelected;

    public LocationPrompt(Activity activity) {
        this.activity = activity;
    }

    public LocationPrompt(Activity activity, final OnLocationSetListener listener) {
        this.activity = activity;
        AlertDialog.Builder builder = new AlertDialog.Builder(activity);
        builder.setTitle("Enter Your Location");
        build(builder)
                .setPositiveButton("Add", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int id) {
                        if (filterDialog == null) {
                            listener.onLocationSet(null, null);
                            return;
                        }
                        listener.onLocationSet(selection, placeSelected);
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                        filterDialog = null;
                        listener.onLocationSet(null, null);
                    }
                });
        filterDialog = builder.create();
        filterDialog.show();

        /*CheckBox useGPS = (CheckBox) filterDialog.findViewById(R.id.useGPS);
        useGPS.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                EditText filterLocation = (EditText) filterDialog.findViewById(R.id.filterLocation);
                filterLocation.setEnabled(!isChecked);
            }
        });*/
    }

    public AlertDialog.Builder build(AlertDialog.Builder builder) {
        LayoutInflater inflater = activity.getLayoutInflater();
        if (view != null) {
            ViewGroup parent = (ViewGroup) view.getParent();
            if (parent != null)
                parent.removeView(view);
        }
        try {
            view = inflater.inflate(R.layout.location_select, null);
        }catch(InflateException e) {
            e.printStackTrace();
        }
        builder.setView(view);
        PlaceAutocompleteFragment autocompleteFragment = (PlaceAutocompleteFragment)
                activity.getFragmentManager().findFragmentById(R.id.place_autocomplete_fragment);
        autocompleteFragment.setOnPlaceSelectedListener(new PlaceSelectionListener() {
            @Override
            public void onPlaceSelected(Place place) {
                selection = place.getAddress().toString();
                placeSelected = place;
            }

            @Override
            public void onError(Status status) {
            }
        });
        return builder;
    }

    public interface OnLocationSetListener {
        void onLocationSet(String location, Place place);
    }

}
