package com.silktours.android.utils;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;
import android.text.InputType;
import android.widget.EditText;

/**
 * Created by andrew on 2/27/17.
 */
public class StringPrompt {
    public interface StringPromptListener {
        void onResult(String result);
    }

    public static void promptInUIThread(final String title, final Activity context, final StringPromptListener listener) {
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                prompt(title, context, listener);
            }
        });
    }

    public static void prompt(String title, Context context, final StringPromptListener listener) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(title);
        final EditText input = new EditText(context);
        input.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        builder.setView(input);

        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String result = input.getText().toString();
                listener.onResult(result);
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
                listener.onResult(null);
            }
        });

        builder.show();
    }
}
