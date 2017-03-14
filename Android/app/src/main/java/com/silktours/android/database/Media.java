package com.silktours.android.database;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by yongqiangfan on 3/13/17.
 */

public class Media extends Base {

    private String url;
    private int displayRank;
    private String filename;

    public Media(JSONObject jsObj) throws JSONException {
        url = jsObj.getString("url");
        displayRank = jsObj.getInt("display_rank");
        filename = jsObj.getString("file_name");

    }

    public String getUrl() {
        return url;
    }

    public int getDisplayRank() {
        return displayRank;
    }

}
