package com.silktours.android;

import android.app.Activity;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.view.MenuItem;

/**
 * Created by andrew on 1/25/17.
 */
public class MenuBar {
    public static void setupClickListeners(final Activity activity) {
        BottomNavigationView bottomNavigationView = (BottomNavigationView)
                activity.findViewById(R.id.bottom_navigation);

        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_profile:
                                startActivity(activity, Profile.class);
                                break;
                            case R.id.action_search:
                                startActivity(activity, search.class);
                                break;
                            case R.id.action_messages:
                                startActivity(activity, Messages.class);
                                break;
                            case R.id.action_my_tours:
                                startActivity(activity, MessageThreads.class);
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
}
