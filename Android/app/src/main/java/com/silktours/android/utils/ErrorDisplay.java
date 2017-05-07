package com.silktours.android.utils;

import android.app.Activity;
import android.os.Looper;
import android.widget.Toast;

/**
 * Use this class to show an error to the user
 */
public class ErrorDisplay {
    /**
     * Displays the error to the user
     * @param message The message to display
     * @param activity The currently active activity
     */
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
