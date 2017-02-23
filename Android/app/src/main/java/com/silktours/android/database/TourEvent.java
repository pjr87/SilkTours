package com.silktours.android.database;

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
}
