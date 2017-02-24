package com.silktours.android.utils;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RatingBar;

import com.silktours.android.MainActivity;
import com.silktours.android.R;

/**
 * Created by andrew on 2/10/17.
 */
public class LocationPrompt {
    private AlertDialog filterDialog;

    public LocationPrompt(Activity activity, final OnLocationSetListener listener) {
        AlertDialog.Builder builder = new AlertDialog.Builder(activity);

        LayoutInflater inflater = activity.getLayoutInflater();

        builder.setView(inflater.inflate(R.layout.location_select, null))
                .setPositiveButton("Search", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int id) {
                        if (filterDialog == null) {
                            listener.onLocationSet(null);
                            return;
                        }
                        EditText filterLocation = (EditText) filterDialog.findViewById(R.id.filterLocation);
                        listener.onLocationSet(filterLocation.getText().toString());
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                        filterDialog = null;
                        listener.onLocationSet(null);
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

    public interface OnLocationSetListener {
        void onLocationSet(String location);
    }
}
