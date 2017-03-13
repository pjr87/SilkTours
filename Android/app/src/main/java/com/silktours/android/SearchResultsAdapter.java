package com.silktours.android;

import android.app.Activity;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.silktours.android.database.Tour;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by andrew on 1/30/17.
 */
public class SearchResultsAdapter extends RecyclerView.Adapter {
    Activity activity;
    List<Tour> tourList;
    int parentWidth, parentHeight;


    public SearchResultsAdapter(Activity activity, List<Tour> tourList, int width, int height) {
        this.activity = activity;
        this.tourList = tourList;
        this.parentWidth = width;
        this.parentHeight = height;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        parentWidth = parent.getWidth();
        parentHeight = parent.getHeight();

        View convertView = LayoutInflater.from(activity).inflate(R.layout.search_result, parent, false);
        return new RecyclerView.ViewHolder(convertView) {
            @Override
            public String toString() {
                return super.toString();
            }
        };
    }

    @Override
    public void onBindViewHolder(final RecyclerView.ViewHolder holder, final int position) {
        final Tour tour = tourList.get(position);
        View convertView = holder.itemView;
        TextView title = (TextView) convertView.findViewById(R.id.searchResultTitle);
        title.setText(tour.getStr("name"));

        final ImageView image = (ImageView) convertView.findViewById(R.id.searchResultImage);
        image.getLayoutParams().width = parentWidth/2;
        image.getLayoutParams().height = tour.profile_image_height*(parentWidth/2)/tour.profile_image_width;
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL thumb_u = new URL(tour.profile_image);
                    final Drawable thumb_d = Drawable.createFromStream(thumb_u.openStream(), "src");
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            image.setImageDrawable(thumb_d);
                        }
                    });
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ViewtourTemp.start(tour);
            }
        });
    }

    @Override
    public int getItemCount() {
        return tourList.size();
    }
}
