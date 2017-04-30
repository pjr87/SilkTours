package com.silktours.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.silktours.android.database.Tour;
import com.silktours.android.database.User;
import com.silktours.android.utils.CredentialHandler;
import com.silktours.android.utils.ErrorDisplay;

import org.json.JSONException;

import java.io.IOException;

public class ViewtourTemp extends Fragment {
    private View rootView;
    private int tour_id;
    private Tour tour;
    private boolean loggedIn;

    public static void start(Tour tour) {
        Bundle args = new Bundle();
        args.putSerializable("tour", tour);
        ViewtourTemp fragment = new ViewtourTemp();
        fragment.setArguments(args);
        MainActivity.getInstance().getMenu().startFragment(fragment, 1);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        loggedIn = (CredentialHandler.getUser(MainActivity.getInstance()) != null);

        this.rootView = inflater.inflate(R.layout.temp_view_tour, container, false);
        if (getArguments() != null) {
            this.tour_id = this.getArguments().getInt("id_user", -1);
            this.tour = (Tour) this.getArguments().getSerializable("tour");
        }
        else {
            ErrorDisplay.show("No tour is specified to show", MainActivity.getInstance());
            return rootView;
        }
        getDataAndFillForms();
        return rootView;
    }

    private void getDataAndFillForms() {
        if (tour != null) {
            fillForms();
            return;
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    tour = Tour.getById(tour_id);
                    fillForms();
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    private void fillForms() {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                EditText name = (EditText) rootView.findViewById(R.id.tourName);
                EditText desc = (EditText) rootView.findViewById(R.id.tourDesc);
                name.setText(tour.getStr("name"));
                desc.setText(tour.getStr("description"));
                setupListeners();
            }
        });
    }

    private void setupListeners() {
        Button messageButton = (Button) rootView.findViewById(R.id.messageButton);
        Button profileButton = (Button) rootView.findViewById(R.id.profileButton);
        Button bookTourButton = (Button) rootView.findViewById(R.id.bookTourButton);

        messageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!loggedIn) {
                    MainActivity.getInstance().logoutWithMessage(ViewtourTemp.this);
                    return;
                }
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            int guide_id = tour.JSON.getJSONArray("guides").getJSONObject(0).getInt("id_user");
                            User guide = User.getByID(guide_id);
                            startMessaging(guide);
                        } catch (IOException | JSONException | NullPointerException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
            }
        });

        profileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    Profile profile = new Profile();
                    Bundle args = new Bundle();
                    int guide_id = tour.JSON.getJSONArray("guides").getJSONObject(0).getInt("id_user");
                    args.putInt("id_user", guide_id);
                    profile.setArguments(args);
                    MainActivity.getInstance().getMenu().startFragment(profile, 0);
                } catch (JSONException | NullPointerException e) {
                    e.printStackTrace();
                }
            }
        });


        bookTourButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!loggedIn) {
                    MainActivity.getInstance().logoutWithMessage(ViewtourTemp.this);
                    return;
                }
                User user = CredentialHandler.getUser(MainActivity.getInstance());
                if (user == null) {
                    Toast.makeText(MainActivity.getInstance(), "Please login to continue.", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(MainActivity.getInstance(), LoginActivity.class);
                    MainActivity.getInstance().startActivity(intent);
                } else {
                    BookTourFragment.start(tour, user);
                }

            }
        });
    }

    private void startMessaging(final User guide) {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                MainActivity.getInstance().launchMessaging(guide);
            }
        });
    }
}
