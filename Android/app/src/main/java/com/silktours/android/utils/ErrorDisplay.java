package com.silktours.android.utils;

import android.app.Activity;
import android.os.Looper;
import android.widget.Toast;

/**
 * Created by andrew on 3/11/17.
 */
public class ErrorDisplay {
    public static void show(final String message, final Activity activity) {
        if (Looper.getMainLooper().getThread() == Thread.currentThread()) {
            Toast.makeText(activity, message, Toast.LENGTH_SHORT).show();
        } else {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    show(message, activity);
                }
            });
        }
    }
}
