package com.silktours.android;

import android.app.Activity;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;

import java.util.Stack;

/**
 * Created by andrew on 1/25/17.
 */
public class MenuBar {
    Stack<Fragment> visited = new Stack<>();
    AppCompatActivity activity;
    Toolbar toolbar;
    BottomNavigationView bottomNavigationView;
    private static final String CURRENT_TAG = "CURRENT";
    private int currentID;
    private boolean isMessaging;

    public void setupClickListeners(final AppCompatActivity activity, Toolbar toolbar) {
        this.activity = activity;
        currentID = R.id.DefaultFrame;
        bottomNavigationView = (BottomNavigationView)
                activity.findViewById(R.id.bottom_navigation);
        Class<?> activityClass = activity.getClass();
        if (activityClass == Profile.class) {
            bottomNavigationView.getMenu().getItem(0).setChecked(true);
        }else if (activityClass == CreateTour.class) {
            bottomNavigationView.getMenu().getItem(2).setChecked(true);
        }else if (activityClass == MyTours.class) {
            bottomNavigationView.getMenu().getItem(3).setChecked(true);
        }else{
            bottomNavigationView.getMenu().getItem(1).setChecked(true);
        }


        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_profile:
                                //startActivity(activity, Profile.class);
                                startFragment(new Profile(), 0);
                                break;
                            case R.id.action_search:
                                //startActivity(activity, search.class);
                                startFragment(new Search(), 1);
                                break;
                            case R.id.action_messages:
                                //startActivity(activity, MessageThreads.class);
                                //startFragment(new CreateTour(), 2);
                                if (!(activity instanceof MessageActivity)) {
                                    startActivity(activity, MessageActivity.class);
                                }
                                break;
                            case R.id.action_my_tours:
                                //startActivity(activity, Tours.class);
                                startFragment(new MyTours(), 3);
                                break;
                        }
                        return false;
                    }
                }
        );
    }
    private static void startActivity(Activity from, Class<?> to) {
        Intent intent = new Intent(from, to);
        from.startActivity(intent);
    }

    public void startFragment(Fragment fragment, int index) {
        if (isMessaging) {
            activity.finish();
            MainActivity.getInstance().getMenu().startFragment(fragment, index);
            return;
        }
        bottomNavigationView.getMenu().getItem(index).setChecked(true);

        visited.push(fragment);
        FragmentManager fragmentManager = activity.getSupportFragmentManager();

        fragmentManager.beginTransaction()
                .replace(currentID, fragment, CURRENT_TAG)
                .commitAllowingStateLoss();
        currentID = fragment.getId();
    }

    public void setIsMessaging(boolean isMessaging) {
        this.isMessaging = isMessaging;
    }
}
