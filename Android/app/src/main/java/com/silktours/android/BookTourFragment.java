package com.silktours.android;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.res.Resources;
import android.graphics.drawable.ColorDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.InflateException;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CalendarView;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.location.places.ui.PlaceAutocompleteFragment;
import com.google.android.gms.location.places.ui.PlaceSelectionListener;
import com.roomorama.caldroid.CaldroidFragment;
import com.roomorama.caldroid.CaldroidListener;
import com.silktours.android.database.PaymentInfo;
import com.silktours.android.database.Tour;
import com.silktours.android.database.TourEvent;
import com.silktours.android.database.Tours;
import com.silktours.android.database.User;
import com.silktours.android.utils.ErrorDisplay;
import com.silktours.android.utils.ListViewUtils;

import org.json.JSONException;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.SimpleFormatter;

/**
 * Created by andrew on 2/23/17.
 */
public class BookTourFragment extends Fragment {
    private Tour tour;
    private User user;
    private View rootView;
    private CaldroidFragment caldroidFragment;
    SimpleDateFormat dateFormatter=new SimpleDateFormat("yyyy-MM-dd");
    private Map<String, List<TourEvent>> eventMap = new HashMap<>();
    private View confirmBookingView;
    private AlertDialog confirmDialog;

    public static void start(Tour tour, User user) {
        Bundle args = new Bundle();
        args.putSerializable("tour", tour);
        args.putSerializable("user", user);
        BookTourFragment fragment = new BookTourFragment();
        fragment.setArguments(args);
        MainActivity.getInstance().getMenu().startFragment(fragment, 3);
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
        caldroidFragment.setCaldroidListener(listener);
        Bundle args = new Bundle();
        Calendar cal = Calendar.getInstance();
        args.putInt(CaldroidFragment.MONTH, cal.get(Calendar.MONTH) + 1);
        args.putInt(CaldroidFragment.YEAR, cal.get(Calendar.YEAR));
        caldroidFragment.setArguments(args);
        android.support.v4.app.FragmentTransaction t = MainActivity.getInstance().getSupportFragmentManager().beginTransaction();
        t.replace(R.id.bookTourCalendar, caldroidFragment);
        t.commit();

        new GetEvents().execute(tour.getInt("id_tour"));
    }

    final CaldroidListener listener = new CaldroidListener() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        @Override
        public void onSelectDate(Date date, View view) {
            ListView timeListView = (ListView) rootView.findViewById(R.id.bookTourTimes);
            String df = dateFormatter.format(date);
            if (eventMap.containsKey(df)) {
                Toast.makeText(MainActivity.getInstance().getApplicationContext(), formatter.format(date),
                        Toast.LENGTH_SHORT).show();
                List<TourEvent> _events = eventMap.get(df);
                List<TourEvent> events = new ArrayList<>();
                for (TourEvent event : _events) {
                    if (event.getStr("state").equals("A"))
                        events.add(event);
                }
                TourEventsAdapter adapter = new TourEventsAdapter(MainActivity.getInstance(), events);

                adapter.setClickListener(new TourEventsAdapter.TourEventClicked() {
                    @Override
                    public void onClick(TourEvent event) {
                        PaymentInfo payment = new PaymentInfo();
                        payment.amount = (double) tour.get("price");
                        payment.user = user;
                        payment.tour = tour;
                        payment.event = event;
                        confirmBooking(payment);
                    }
                });

                timeListView.setAdapter(adapter);
            }else{
                timeListView.setAdapter(new TourEventsAdapter(MainActivity.getInstance(), new ArrayList<TourEvent>()));
            }
            ListViewUtils.setListViewHeightBasedOnChildren(timeListView);
        }

        @Override
        public void onChangeMonth(int month, int year) {
            String text = "month: " + month + " year: " + year;
            Toast.makeText(MainActivity.getInstance().getApplicationContext(), text,
                    Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onLongClickDate(Date date, View view) {
            Toast.makeText(MainActivity.getInstance().getApplicationContext(),
                    "Long click " + formatter.format(date),
                    Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onCaldroidViewCreated() {
            Toast.makeText(MainActivity.getInstance().getApplicationContext(),
                    "Caldroid view is created",
                    Toast.LENGTH_SHORT).show();
        }

    };

    private void confirmBooking(final PaymentInfo payment) {
        Activity activity = MainActivity.getInstance();
        AlertDialog.Builder builder = new AlertDialog.Builder(activity);

        LayoutInflater inflater = activity.getLayoutInflater();
        
        if (confirmBookingView != null) {
            ViewGroup parent = (ViewGroup) confirmBookingView.getParent();
            if (parent != null)
                parent.removeView(confirmBookingView);
        }
        try {
            confirmBookingView = inflater.inflate(R.layout.confirm_booking, null);
        }catch(InflateException e) {
            e.printStackTrace();
        }

        builder.setView(confirmBookingView)
                .setPositiveButton("Confirm", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int id) {
                        if (confirmDialog == null) {
                            return;
                        }
                        MainActivity.getInstance().processPayment(payment, new MainActivity.PaymentListener() {
                            @Override
                            public void done(boolean success) {
                                if (success) {
                                    bookTour(payment);
                                    Toast.makeText(MainActivity.getInstance(), "Tour Booked Successfully", Toast.LENGTH_SHORT).show();
                                    ViewtourTemp.start(tour);
                                    Viewtour.start(tour);
                                } else {
                                    ErrorDisplay.show("Unable to process payment, please try again.", MainActivity.getInstance());
                                }
                            }
                        });
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                        confirmDialog = null;
                    }
                });
        confirmDialog = builder.create();
        confirmDialog.show();
        ((EditText)confirmDialog.findViewById(R.id.confirmName)).setText(payment.tour.getStr("name"));
        ((EditText)confirmDialog.findViewById(R.id.confirmPrice)).setText(payment.tour.get("price").toString());
        ((EditText)confirmDialog.findViewById(R.id.confirmStartTime)).setText(payment.event.getStr("start_date_time"));
        ((EditText)confirmDialog.findViewById(R.id.confirmEndTime)).setText(payment.event.getStr("end_date_time"));
    }

    private void bookTour(final PaymentInfo info) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    info.event.book();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
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
                    String date = dateFormatter.format(startDate);
                    List<TourEvent> eventList = eventMap.get(date);
                    if (eventList == null) {
                        eventList = new ArrayList<>();
                        eventMap.put(date, eventList);
                    }
                    eventList.add(result);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            caldroidFragment.refreshView();
        }
    }
}
