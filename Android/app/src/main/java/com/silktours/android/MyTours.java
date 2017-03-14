package com.silktours.android;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListAdapter;
import android.widget.ListView;

import com.silktours.android.database.Controller;
import com.silktours.android.database.Tours;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Stack;

import static android.content.ContentValues.TAG;


public class MyTours extends Fragment {

    Stack<Fragment> visited = new Stack<>();
    private static final String CURRENT_TAG = "CURRENT";
    private int currentID;
    private Tours[] tours;
    private ListView listView;
    private LayoutInflater inflater;
    private Bundle bundle;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.content_my_tours, container, false);
        currentID = R.id.DefaultFrame;
        this.inflater = inflater;
        listView = (ListView) rootView.findViewById(R.id.tourListView);
        getTours();
        return rootView;
    }

    public void getTours() {
        new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... params) {

                try {
                    return Controller.sendGet("/search");
                } catch (Exception e) {
                    Log.e(TAG, "doInBackground: ", e);
                }
                return "failed";
            }

            @Override
            protected void onPostExecute(String response) {
                try {
                    JSONObject jsObj = new JSONObject(response);
                    JSONArray jsArray = jsObj.getJSONArray("data");
                    Log.d(TAG, "onPostExecute: finished JSON1");
                    tours = new Tours[jsArray.length()];
                    for(int i = 0; i < jsArray.length(); i++) {
                        tours[i] = new Tours(jsArray.getJSONObject(i));
                    }
                    ListAdapter tourAdapter = new MyToursAdapter(MainActivity.getInstance(), tours);
                    listView.setAdapter(tourAdapter);
                    listView.setOnItemClickListener(new listOnClickListener());
                } catch (Exception e) {
                    Log.e(TAG, "onPostExecute: ", e);
                }
            }
        }.execute();
    }

    private void startFragment(Fragment fragment) {
        fragment.setArguments(bundle);

        visited.push(fragment);
        FragmentManager fragmentManager = MainActivity.getInstance().getSupportFragmentManager();

        fragmentManager.beginTransaction()
                .replace(currentID, fragment, CURRENT_TAG)
                .commit();
        currentID = fragment.getId();
    }

    public class listOnClickListener implements AdapterView.OnItemClickListener {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            bundle = new Bundle();
            //Log.d(TAG, "onItemClick: " + tours[position].getName());
            bundle.putSerializable("TourObject", tours[position]);
            startFragment(new Viewtour());
        }
    }
}
