package com.silktours.android;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.silktours.android.database.Controller;
import com.silktours.android.database.Tours;

import org.json.JSONArray;
import org.json.JSONObject;

import static android.content.ContentValues.TAG;


public class MyTours extends Fragment {

    private String userID = "hhh";
    private TextView text;
    private Tours[] tours;
    private ListView listView;
    private LayoutInflater inflater;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.content_my_tours, container, false);
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
                    Log.d(TAG, "onPostExecute: finished JSON3");
                    ListAdapter tourAdapter = new MyToursAdapter(MainActivity.getInstance(), tours);
                    Log.d(TAG, "onPostExecute: finished adp");
                    listView.setAdapter(tourAdapter);
                } catch (Exception e) {
                    Log.e(TAG, "onPostExecute: ", e);
                }


            }
        }.execute();
    }
}
