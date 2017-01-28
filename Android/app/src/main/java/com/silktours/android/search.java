package com.silktours.android;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridView;
import android.widget.SearchView;
import android.widget.TextView;

import com.silktours.android.database.Tour;

import org.apmem.tools.layouts.FlowLayout;
import org.json.JSONException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by andrew on 1/26/17.
 */
public class Search extends Fragment {
    private View rootView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        this.rootView = inflater.inflate(R.layout.content_search, container, false);
        final SearchView searchView = (SearchView) rootView.findViewById(R.id.searchView);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextChange(String newText) {
                //Log.e("onQueryTextChange", "called");
                return false;
            }

            @Override
            public boolean onQueryTextSubmit(String query) {
                search(searchView.getQuery().toString());
                return false;
            }
        });
        return rootView;
    }
    private void search(final String query) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    List<String> keywords = Arrays.asList(query.split(" "));
                    final List<Tour> tours = Tour.getBySearch(keywords);
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
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
