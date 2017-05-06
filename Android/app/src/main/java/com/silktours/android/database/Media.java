package com.silktours.android.database;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Used to represent the SQL media table
 */
public class Media extends Base {

    private String url;
    private int displayRank;
    private String filename;

    /**
     * Create a new media object from JSON schema
     * @param jsObj
     * @throws JSONException
     */
    public Media(JSONObject jsObj) throws JSONException {
        url = jsObj.getString("url");
        displayRank = jsObj.getInt("display_rank");
        filename = jsObj.getString("file_name");

    }

    /**
     * @return The url to image/video
     */
    public String getUrl() {
        return url;
    }

    /**
     * @return The index to use for displaying the image/video in a UI
     */
    public int getDisplayRank() {
        return displayRank;
    }

}
