package com.silktours.android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Adapter;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.silktours.android.database.PaymentInfo;
import com.silktours.android.database.TourEvent;
import com.silktours.android.database.User;

import org.w3c.dom.Text;

import java.util.List;

/**
 * Created by andrew on 2/23/17.
 */
public class TourEventsAdapter extends ArrayAdapter<TourEvent> {
    private TourEventClicked listener;

    public TourEventsAdapter(Context context, int textViewResourceId) {
        super(context, textViewResourceId);
    }

    public TourEventsAdapter(Context context, List<TourEvent> items) {
        super(context, R.layout.tour_event_row, items);
    }
    
    public void setClickListener(TourEventClicked listener) {
        this.listener = listener;
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
        v.setOnClickListener(new ItemClickListener(tourEvent));
        startTime.setText(tourEvent.get("start_date_time").toString());
        return v;
    }

    private class ItemClickListener implements View.OnClickListener{
        private final TourEvent event;

        public ItemClickListener(TourEvent event) {
            this.event = event;
        }

        @Override
        public void onClick(View v) {
            if (listener != null) {
                listener.onClick(event);
            }
        }
    }

    public interface TourEventClicked {
        void onClick(TourEvent event);
    }
}
