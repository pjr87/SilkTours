package com.silktours.android;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RatingBar;
import android.widget.SearchView;

import com.silktours.android.database.Create_Tour;
import com.silktours.android.database.Tour;
import com.silktours.android.utils.ErrorDisplay;

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
    private int page = 0;

    // Items needed for pagination
    private boolean loading = true;
    int pastVisibleItems, visibleItemCount, totalItemCount;

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
                search(0);
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

        Button createTourButton = (Button) rootView.findViewById(R.id.createTour);
        createTourButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MainActivity.getInstance().getMenu().startFragment(new CreateTour(), 1);
            }
        });


        recyclerView = (RecyclerView) rootView.findViewById(R.id.recyclerView);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        makeLayoutManager();
        recyclerView.setLayoutManager(manager);
        setupScrollListener();
        searchDefault();
        return rootView;
    }

    private void setupScrollListener() {
        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                visibleItemCount = manager.getChildCount();
                totalItemCount = manager.getItemCount();
                int[] firstVisibleItems = null;
                firstVisibleItems = manager.findFirstVisibleItemPositions(null);
                if (firstVisibleItems != null && firstVisibleItems.length > 0) {
                    pastVisibleItems = firstVisibleItems[0];
                }

                if (loading) {
                    if ((visibleItemCount + pastVisibleItems) >= totalItemCount) {
                        loading = false;
                        ErrorDisplay.show("Making new items", MainActivity.getInstance());
                        page++;
                        search(page);
                    }
                }
            }
        });
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
                        search(0);
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

    private void searchDefault() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                final List<Tour> tours;
                try {
                    tours = Tour.getDefaultSearch();
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                    return;
                }
                updateResults(tours, 0);
            }
        }).start();
    }

    private void search(final int page) {
        this.page = page;
        filterParams.query = searchView.getQuery().toString();
        filterParams.page = page;

        new Thread(new Runnable() {
            @Override
            public void run() {
                final List<Tour> tours;
                try {
                    tours = Tour.getBySearch(filterParams);
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                    return;
                }
                updateResults(tours, page);
            }
        }).start();
    }

    private void updateResults(final List<Tour> tours, final int page) {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (page == 0) {
                    RecyclerView.Adapter i = new SearchResultsAdapter(
                            MainActivity.getInstance(),
                            tours,
                            recyclerView.getWidth(),
                            recyclerView.getHeight()
                    );
                    recyclerView.swapAdapter(i, false);
                }else{
                    SearchResultsAdapter adapter = (SearchResultsAdapter) recyclerView.getAdapter();
                    adapter.add(tours);
                }
                loading = true;
            }
        });
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
