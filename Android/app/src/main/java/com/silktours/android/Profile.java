package com.silktours.android;

import android.graphics.drawable.Drawable;
import android.media.Image;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.silktours.android.database.User;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URL;

public class Profile extends Fragment {
    private View rootView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.content_profile, container, false);
        filloutFields(1);
        return rootView;
    }

    private void filloutFields(final int userID) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                User user;
                final Drawable profileImage;
                try {
                    user = User.getByID(userID);
                    URL thumb_u = new URL(user.profile_picture);
                    profileImage = Drawable.createFromStream(thumb_u.openStream(), "src");
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                    return;
                }
                updateFieldsOnURThread(user, profileImage);
            }
        }).start();
    }

    private void updateFieldsOnURThread(final User user, final Drawable profileImageDrawable) {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                EditText firstName = (EditText) rootView.findViewById(R.id.firstName);
                EditText lastName = (EditText) rootView.findViewById(R.id.lastName);
                EditText phoneNumber = (EditText) rootView.findViewById(R.id.phoneNumber);
                EditText email = (EditText) rootView.findViewById(R.id.email);
                ImageView profileImage = (ImageView) rootView.findViewById(R.id.profileImage);
                profileImage.setImageDrawable(profileImageDrawable);
                firstName.setText(user.first_name);
                lastName.setText(user.last_name);
                phoneNumber.setText(user.phone_number);
                email.setText(user.email);
            }
        });
    }
}
