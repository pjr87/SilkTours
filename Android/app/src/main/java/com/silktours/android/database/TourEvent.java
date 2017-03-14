package com.silktours.android.database;

import android.util.Log;

import com.silktours.android.MainActivity;
import com.silktours.android.utils.CredentialHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by andrew on 2/23/17.
 */
public class TourEvent extends Base {
    private Tour tour;
    public static List<TourEvent> getEvents(int tourId) throws IOException, JSONException {
        JSONArray jsonArray = Common.getJsonArray(Common.SERVER_URL + "/tour/" + tourId + "/events");

        ArrayList<TourEvent> result = new ArrayList<>(jsonArray.length());
        for (int i=0; i<jsonArray.length(); i++) {
            TourEvent tourEvent = new TourEvent();
            tourEvent.JSON = jsonArray.getJSONObject(i);
            result.add(tourEvent);
        }
        return result;
    }

    public Tour getTour() {
        if (tour != null) {
            return tour;
        }
        try {
            tour = Tour.getById(this.getInt("id_tour"));
            return tour;
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void commit() throws IOException {
        String url = Common.SERVER_URL + "/tourevents/" + getInt("id_tourEvent");
        set("bypass", true); // Bypass auth
        String result = Common.request(url, JSON.toString(), "PUT");
    }

    public void book() throws IOException {
        set("state", "B");
        commit();
    }
}
