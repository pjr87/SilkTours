package com.silktours.android.utils;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;
import android.text.InputType;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;

import com.silktours.android.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Prompts the user for information about themselves
 */
public class CreateUserPrompt {
    private static final String[] prompts = new String[]{"First Name", "Last Name", "Phone Number", "Location"};
    private static final int PHONE_ID = 2;
    private static final int LOCATION_ID = 3;
    private int promptId = 0;
    private List<String> results = new ArrayList<>(prompts.length);
    EditText input;
    private LocationPrompt locactionPrompt;
    private Activity context;

    /**
     * Initializes the object, but does not yet show the prompt
     */
    public CreateUserPrompt() {
        for (String ignored : prompts) {
            results.add("");
        }
    }

    /**
     * Called on completion or cancel
     */
    public interface CreateUserPromptListener {
        void onResult(List<String> keys, List<String> values);

        void onCancel();
    }

    /**
     * Show the prompt
     * @param context
     * @param listener
     */
    public void promptUIThread(final Activity context, final CreateUserPromptListener listener) {
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                prompt(context, listener);
            }
        });
    }

    /**
     * Show the prompt
     * @param context
     * @param listener
     */
    public void prompt(final Activity context, final CreateUserPromptListener listener) {
        this.context = context;
        showKeyboard();
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle("Enter Your " + prompts[promptId]);
        if (promptId != LOCATION_ID) {
            input = new EditText(context);
            if (promptId == PHONE_ID) {
                input.setInputType(InputType.TYPE_CLASS_PHONE);
            } else {
                input.setInputType(InputType.TYPE_CLASS_TEXT);
            }
            builder.setView(input);
        }else{
            this.locactionPrompt = new LocationPrompt(context);
            builder = this.locactionPrompt.build(builder);
        }

        builder.setPositiveButton("Next", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (locactionPrompt != null) {
                            results.set(promptId, locactionPrompt.selection);
                        }else {
                            results.set(promptId, input.getText().toString());
                        }
                        promptId++;
                        if (promptId >= prompts.length) {
                            new Thread(new Runnable() {
                                @Override
                                public void run() {
                                    listener.onResult(Arrays.asList(prompts), results);
                                }
                            }).start();

                            dialog.cancel();
                            return;
                        }
                        prompt(context, listener);
                        //builder.setTitle("Enter your " + prompts[promptId]);
                        //input.setText("");
                    }
                }
        );
        builder.setNeutralButton("Previous", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (promptId == 0) {
                            dialog.cancel();
                            listener.onCancel();
                            return;
                        }
                        promptId--;
                        prompt(context, listener);
                        //builder.setTitle("Enter your " + prompts[promptId]);
                        //input.setText("");
                    }
                }

        );
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.cancel();
                        listener.onCancel();
                    }
                }

        );
        Dialog dialog = builder.create();
        dialog.getWindow().getAttributes().windowAnimations = R.style.dialog_animation;
        dialog.show();
    }

    private void showKeyboard() {
        ((InputMethodManager)context.getSystemService(Context.INPUT_METHOD_SERVICE)).toggleSoftInput(InputMethodManager.SHOW_FORCED, InputMethodManager.HIDE_IMPLICIT_ONLY);
    }
}
