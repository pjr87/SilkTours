package com.silktours.android;

import android.content.res.Resources;
import android.graphics.drawable.ColorDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CalendarView;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.roomorama.caldroid.CaldroidFragment;
import com.silktours.android.database.Tour;
import com.silktours.android.database.TourEvent;
import com.silktours.android.database.User;

import org.json.JSONException;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by andrew on 2/23/17.
 */
public class BookTourFragment extends Fragment {
    private Tour tour;
    private User user;
    private View rootView;
    private CaldroidFragment caldroidFragment;


    public static void start(Tour tour, User user) {
        Bundle args = new Bundle();
        args.putSerializable("tour", tour);
        args.putSerializable("user", user);
        BookTourFragment fragment = new BookTourFragment();
        fragment.setArguments(args);
        MainActivity.getInstance().getMenu().startFragment(fragment);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.content_book_tour, container, false);
        this.tour = (Tour) getArguments().getSerializable("tour");
        this.user = (User) getArguments().get("user");
        setupCalendar();
        return rootView;
    }

    private void setupCalendar() {
        this.caldroidFragment = new CaldroidFragment();
        Bundle args = new Bundle();
        Calendar cal = Calendar.getInstance();
        args.putInt(CaldroidFragment.MONTH, cal.get(Calendar.MONTH) + 1);
        args.putInt(CaldroidFragment.YEAR, cal.get(Calendar.YEAR));
        caldroidFragment.setArguments(args);
        android.support.v4.app.FragmentTransaction t = MainActivity.getInstance().getSupportFragmentManager().beginTransaction();
        t.replace(R.id.bookTourCalendar, caldroidFragment);
        t.commit();

        new GetEvents().execute(1);
    }

    private class GetEvents extends AsyncTask<Integer, Integer, List<TourEvent>> {
        protected List<TourEvent> doInBackground(Integer... id) {
            try {
                return TourEvent.getEvents(id[0]);
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
            return null;
        }

        protected void onProgressUpdate(Integer... progress) {
            //setProgressPercent(progress[0]);
        }

        protected void onPostExecute(List<TourEvent> results) {
            ColorDrawable blue = new ColorDrawable(0xBB0000FF);
            SimpleDateFormat parser=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            for (TourEvent result : results) {
                try {
                    Date startDate = parser.parse(result.getStr("start_date_time"));
                    caldroidFragment.setBackgroundDrawableForDate(blue, startDate);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            caldroidFragment.refreshView();
        }
    }
}
