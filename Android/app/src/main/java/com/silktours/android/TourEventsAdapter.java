package com.silktours.android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Adapter;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.silktours.android.database.TourEvent;

import org.w3c.dom.Text;

import java.util.List;

/**
 * Created by andrew on 2/23/17.
 */
public class TourEventsAdapter extends ArrayAdapter<TourEvent> {
    public TourEventsAdapter(Context context, int textViewResourceId) {
        super(context, textViewResourceId);
    }

    public TourEventsAdapter(Context context, List<TourEvent> items) {
        super(context, R.layout.tour_event_row, items);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View v = convertView;

        if (v == null) {
            LayoutInflater vi = LayoutInflater.from(getContext());
            v = vi.inflate(R.layout.tour_event_row, null);
        }

        TextView startTime = (TextView) v.findViewById(R.id.tourEventStartTime);
        TourEvent tourEvent = getItem(position);
        startTime.setText(tourEvent.get("start_date_time").toString());
        return v;
    }

}
