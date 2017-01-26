package com.silktours.android;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.support.v4.app.Fragment;

public class MainActivity extends AppCompatActivity {
    private static final String CURRENT_TAG = "CURRENT";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);

        setSupportActionBar(toolbar);
        MenuBar menu = new MenuBar();
        menu.setupClickListeners(this, toolbar);

        Fragment currentFragment = new Search();
        FragmentManager fragmentManager = getSupportFragmentManager();

        fragmentManager.beginTransaction()
                .replace(R.id.DefaultFrame, currentFragment, CURRENT_TAG)
                .commit();
    }

}
