package com.silktours.android;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.res.Configuration;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RatingBar;
import android.widget.SearchView;

import com.silktours.android.database.Tour;

import org.json.JSONException;

import java.io.IOException;
import java.util.List;

/**
 * Created by andrew on 1/26/17.
 */
public class Search extends Fragment {
    private View rootView;
    private Tour.FilterParams filterParams;
    private AlertDialog filterDialog;
    private SearchView searchView;
    private StaggeredGridLayoutManager manager;
    private RecyclerView recyclerView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        this.filterParams = new Tour.FilterParams();
        this.rootView = inflater.inflate(R.layout.content_search, container, false);
        searchView = (SearchView) rootView.findViewById(R.id.searchView);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextChange(String newText) {
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

        recyclerView = (RecyclerView) rootView.findViewById(R.id.recyclerView);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        makeLayoutManager();
        recyclerView.setLayoutManager(manager);
        return rootView;
    }

    private void makeLayoutManager() {
        if(getActivity().getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT){
            manager = new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);
        }
        else{
            manager = new StaggeredGridLayoutManager(4, StaggeredGridLayoutManager.VERTICAL);
        }
        manager.setGapStrategy(StaggeredGridLayoutManager.GAP_HANDLING_NONE);
        manager.setItemPrefetchEnabled(false);
    }

    private void launchFilterDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

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
            minRating.setRating((float)filterParams.minRating);
        }
    }

    private void search() {
        filterParams.query = searchView.getQuery().toString();

        new Thread(new Runnable() {
            @Override
            public void run() {
                final List<Tour> tours;
                try {
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
                        RecyclerView.Adapter i = new SearchResultsAdapter(
                                MainActivity.getInstance(),
                                tours,
                                recyclerView.getWidth(),
                                recyclerView.getHeight()
                        );
                        recyclerView.swapAdapter(i, false);
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
