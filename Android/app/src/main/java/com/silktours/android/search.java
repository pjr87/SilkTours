package com.silktours.android;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RatingBar;
import android.widget.SearchView;
import android.widget.TextView;

import com.silktours.android.database.Tour;

import org.apmem.tools.layouts.FlowLayout;
import org.json.JSONException;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * Created by andrew on 1/26/17.
 */
public class Search extends Fragment {
    private View rootView;
    private Tour.FilterParams filterParams;
    private AlertDialog filterDialog;
    private SearchView searchView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        this.filterParams = new Tour.FilterParams();
        this.rootView = inflater.inflate(R.layout.content_search, container, false);
        searchView = (SearchView) rootView.findViewById(R.id.searchView);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextChange(String newText) {
                //Log.e("onQueryTextChange", "called");
                return false;
            }

            @Override
            public boolean onQueryTextSubmit(String query) {
                search();
                return false;
            }
        });

        ImageButton filterButton = (ImageButton) rootView.findViewById(R.id.filterButton);
        filterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                launchFilterDialog();
            }
        });
        return rootView;
    }

    private void launchFilterDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        // Get the layout inflater
        LayoutInflater inflater = getActivity().getLayoutInflater();

        builder.setView(inflater.inflate(R.layout.dialog_filter_search, null))
                .setPositiveButton("Search", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int id) {
                        if (filterDialog == null)
                            return;
                        EditText location = (EditText) filterDialog.findViewById(R.id.filterLocation);
                        EditText radius = (EditText) filterDialog.findViewById(R.id.filterRadius);
                        CheckBox useCurrentLocation = (CheckBox) filterDialog.findViewById(R.id.filterCurrentLocation);
                        EditText priceMin = (EditText) filterDialog.findViewById(R.id.filterPriceMin);
                        EditText priceMax = (EditText) filterDialog.findViewById(R.id.filterPriceMax);
                        RatingBar minRating = (RatingBar) filterDialog.findViewById(R.id.filterRating);
                        filterParams.location = location.getText().toString().trim();
                        filterParams.radius = stringToInt(radius.getText().toString());
                        filterParams.useCurrentLocation = useCurrentLocation.isChecked();
                        filterParams.priceMin = stringToFloat(priceMin.getText().toString());
                        filterParams.priceMax = stringToFloat(priceMax.getText().toString());
                        filterParams.minRating = minRating.getRating();
                        filterDialog = null;
                        search();
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                        filterDialog = null;
                    }
                });
        filterDialog = builder.create();
        filterDialog.show();
        if (filterParams != null) {
            EditText location = (EditText) filterDialog.findViewById(R.id.filterLocation);
            EditText radius = (EditText) filterDialog.findViewById(R.id.filterRadius);
            CheckBox useCurrentLocation = (CheckBox) filterDialog.findViewById(R.id.filterCurrentLocation);
            EditText priceMin = (EditText) filterDialog.findViewById(R.id.filterPriceMin);
            EditText priceMax = (EditText) filterDialog.findViewById(R.id.filterPriceMax);
            RatingBar minRating = (RatingBar) filterDialog.findViewById(R.id.filterRating);
            location.setText(filterParams.location);
            radius.setText(String.valueOf(filterParams.radius));
            useCurrentLocation.setChecked(filterParams.useCurrentLocation);
            priceMin.setText(String.valueOf(filterParams.priceMin));
            priceMax.setText(String.valueOf(filterParams.priceMax));
            minRating.setRating(filterParams.minRating);
        }
    }

    private void search() {
        filterParams.query = searchView.getQuery().toString();
        new Thread(new Runnable() {
            @Override
            public void run() {
                final List<Tour> tours;
                try {
                    //List<String> keywords = Arrays.asList(query.split(" "));
                    tours = Tour.getBySearch(filterParams);
                } catch (IOException e) {
                    e.printStackTrace();
                    return;
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }
                MainActivity.getInstance().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        FlowLayout grid = (FlowLayout) rootView.findViewById(R.id.searchResults);
                        grid.removeAllViews();
                        for (Tour tour : tours) {
                            LayoutInflater inflater = (LayoutInflater) MainActivity.getInstance()
                                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                            View view = inflater.inflate(R.layout.search_result, grid, false);
                            TextView title = (TextView) view.findViewById(R.id.searchResultTitle);
                            title.setText(tour.name);
                            grid.addView(view);
                        }
                    }
                });
            }
        }).start();
    }

    private Float stringToFloat(String f) {
        if (f==null)
            return (float)0.0;
        try {
            return Float.parseFloat(f);
        }catch (NumberFormatException e) {
            return null;
        }
    }

    private Integer stringToInt(String i) {
        if (i==null)
            return 0;
        try {
            return Integer.parseInt(i);
        }catch (NumberFormatException e) {
            return null;
        }
    }
}
