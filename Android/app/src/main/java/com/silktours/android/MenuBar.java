package com.silktours.android;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.design.internal.BottomNavigationItemView;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;

import com.silktours.android.database.User;
import com.silktours.android.utils.CredentialHandler;
import com.silktours.android.utils.RoundedImageView;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Stack;
import java.util.TimerTask;

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
    private Stack<Integer> indexStack = new Stack<>();
    private int retryCount = 0;

    public void setupClickListeners(final AppCompatActivity activity, Toolbar toolbar) {
        indexStack.push(1);
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
                                Profile profile = new Profile();
                                //Bundle args = new Bundle();
                                //args.putInt("id_user", 41);
                                //profile.setArguments(args);
                                startFragment(profile, 0);
                                break;
                            case R.id.action_search:
                                //startActivity(activity, search.class);
                                startFragment(new Search(), 1);
                                break;
                            case R.id.action_messages:
                                //startActivity(activity, MessageThreads.class);
                                startFragment(new CreateTour(), 2);
                                //TODO if app crashes, it's this or the map
                                //if (!(activity instanceof MessageActivity)) {
                                //   MainActivity.getInstance().launchMessaging(null);
                                //}
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

    public void startFragment(final Fragment fragment, final int index) {
        if (isMessaging) {
            activity.finish();
            MainActivity.getInstance().getMenu().startFragment(fragment, index);
            return;
        }
        bottomNavigationView.getMenu().getItem(index).setChecked(true);


        FragmentManager fragmentManager = activity.getSupportFragmentManager();

        try {
            fragmentManager.beginTransaction()
                    .replace(currentID, fragment, CURRENT_TAG)
                    .addToBackStack(null).commit();
            retryCount = 0;
        } catch(IllegalStateException e) {
            // Retry after 20ms
            if (retryCount > 20) {
                retryCount = 0;
                return;
            }
            final Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    retryCount++;
                    startFragment(fragment, index);
                }
            }, 20);
            return;
        }
        visited.push(fragment);
        indexStack.push(index);
        //.commitAllowingStateLoss();
        currentID = fragment.getId();
    }

    public void setIsMessaging(boolean isMessaging) {
        this.isMessaging = isMessaging;
    }

    public void backPressed() {
        if (indexStack.size() <= 1) {
            return;
        }
        indexStack.pop();
        int index = indexStack.peek();
        bottomNavigationView.getMenu().getItem(index).setChecked(true);
    }

    private void setProfile() {
        // Set the profile icon
        final User user = CredentialHandler.getUser(activity);
        if (user != null) {
            final BottomNavigationItemView item = (BottomNavigationItemView) activity.findViewById(R.id.action_profile);
            new Thread(new Runnable() {
                @Override
                public void run() {
                    URL thumb_u = null;
                    try {
                        thumb_u = new URL(user.getStr(User.PROFILE_PICTURE));
                    } catch (MalformedURLException e) {
                        e.printStackTrace();
                        return;
                    }
                    final Drawable icon;
                    try {
                        Drawable thumb_d = Drawable.createFromStream(thumb_u.openStream(), "src");
                        Bitmap b = ((BitmapDrawable)thumb_d).getBitmap();

                        b = RoundedImageView.getCroppedBitmap(b, b.getWidth());

                        icon = new BitmapDrawable(activity.getResources(),Bitmap.createScaledBitmap(b, 250, 250, false));
                    } catch (IOException e) {
                        e.printStackTrace();
                        return;
                    }
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            item.setScaleX((float) 1.5);
                            item.setScaleY((float) 1.5);
                            item.setIconTintList(null);
                            item.setIcon(icon);
                            // item.setBackground(icon);
                        }
                    });
                }
            }).start();
        }
    }
}
