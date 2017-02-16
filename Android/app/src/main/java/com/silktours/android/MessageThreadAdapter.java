package com.silktours.android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;

/**
 * Created by yongqiangfan on 2/5/17.
 */

public class MessageThreadAdapter extends ArrayAdapter{

    public MessageThreadAdapter(Context context) {
        super(context, 0);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.message_thread_item, parent, false);
        }

        return null;
    }
}
