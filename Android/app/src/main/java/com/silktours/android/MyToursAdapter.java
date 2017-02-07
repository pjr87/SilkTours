package com.silktours.android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.silktours.android.database.Tours;

/**
 * Created by yongqiangfan on 2/6/17.
 */

public class MyToursAdapter extends ArrayAdapter<Tours>{

    public MyToursAdapter(Context context, Tours[] tours) {
        super(context, 0, tours);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater tourInflater = LayoutInflater.from(getContext());
        final View tourView = tourInflater.inflate(R.layout.my_tours_item, parent, false);

        final Tours tour = getItem(position);

        TextView txtCity = (TextView) tourView.findViewById(R.id.txtCity);
        TextView txtName = (TextView) tourView.findViewById(R.id.txtName);

        txtCity.setText(tour.getCity());
        txtName.setText(tour.getName());

        return tourView;
    }
}
