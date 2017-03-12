package com.silktours.android;

import android.graphics.drawable.Drawable;
import android.media.Image;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.silktours.android.database.User;
import com.silktours.android.utils.CreateUserPrompt;
import com.silktours.android.utils.CredentialHandler;
import com.silktours.android.utils.ErrorDisplay;
import com.silktours.android.utils.LocationPrompt;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

public class Profile extends Fragment {
    private View rootView;
    private User user;
    private ImageView profileImage;
    private EditText firstName;
    private EditText lastName;
    private EditText phoneNumber;
    private EditText email;
    private TextView location;
    private int id_user;
    private boolean editable = false;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        this.id_user = this.getArguments().getInt("id_user", -1);
        rootView = inflater.inflate(R.layout.content_profile, container, false);
        firstName = (EditText) rootView.findViewById(R.id.firstName);
        lastName = (EditText) rootView.findViewById(R.id.lastName);
        phoneNumber = (EditText) rootView.findViewById(R.id.phoneNumber);
        email = (EditText) rootView.findViewById(R.id.email);
        location = (TextView) rootView.findViewById(R.id.locationTextView);
        profileImage = (ImageView) rootView.findViewById(R.id.profileImage);
        filloutFields();
        setUpListeners();
        return rootView;
    }

    private void filloutFields() {
        if (id_user == -1) {
            user = CredentialHandler.getUser(MainActivity.getInstance());
            if (user == null) {
                MainActivity.getInstance().login();
                return;
            }
            editable = true;
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                if (id_user != -1) {
                    try {
                        user = User.getByID(id_user);
                    } catch (IOException | JSONException e) {
                        ErrorDisplay.show("Could not get user.", MainActivity.getInstance());
                        return;
                    }
                }
                URL thumb_u = null;
                Drawable profileImage;
                try {
                    thumb_u = new URL(user.getStr(user.PROFILE_PICTURE));
                    profileImage = Drawable.createFromStream(thumb_u.openStream(), "src");
                } catch (IOException e) {
                    e.printStackTrace();
                    profileImage = null;
                }
                updateFieldsOnURThread(profileImage);
            }
        }).start();
    }

    private void filloutFields(final int userID) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                User user;
                final Drawable profileImage;
                try {
                    user = User.getByID(userID);
                    URL thumb_u = new URL(user.getStr(user.PROFILE_PICTURE));
                    profileImage = Drawable.createFromStream(thumb_u.openStream(), "src");
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                    return;
                }
                Profile.this.user = user;
                updateFieldsOnURThread(profileImage);
            }
        }).start();
    }

    private void updateFieldsOnURThread(final Drawable profileImageDrawable) {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (profileImageDrawable != null)
                    profileImage.setImageDrawable(profileImageDrawable);
                firstName.setText(user.getStr(user.FIRST_NAME));
                lastName.setText(user.getStr(user.LAST_NAME));
                phoneNumber.setText(user.getStr(user.PHONE_NUMBER));
                email.setText(user.getStr(user.EMAIL));
                try {
                    location.setText(user.getStr("address:street"));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void setUpListeners() {
        ImageButton locationEdit = (ImageButton) rootView.findViewById(R.id.locationEdit);
        locationEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new LocationPrompt(MainActivity.getInstance(), new LocationPrompt.OnLocationSetListener() {
                    @Override
                    public void onLocationSet(String location) {
                        if (location != null) {
                            TextView locationView = (TextView) rootView.findViewById(R.id.locationTextView);
                            locationView.setText(location);
                        }
                    }
                });
            }
        });

        Button saveButton = (Button) rootView.findViewById(R.id.saveProfile);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (user == null) return;
                if (!editable) {
                    ErrorDisplay.show("You can not edit this user.", MainActivity.getInstance());
                    return;
                }
                user.set("address:street", location.getText().toString());
                user.set(User.EMAIL, email.getText().toString());
                user.set(User.PHONE_NUMBER, phoneNumber.getText().toString());
                user.set(User.LAST_NAME, lastName.getText().toString());
                user.set(User.FIRST_NAME, firstName.getText().toString());
                commitUser();
            }
        });
    }
    private void commitUser() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    user.commit();
                    postCommit(false);
                } catch (IOException e) {
                    postCommit(true);
                    e.printStackTrace();
                }

            }
        }).start();
    }
    private void postCommit(final boolean error) {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!error) {
                    Toast.makeText(MainActivity.getInstance(),
                            "User saved successfully",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MainActivity.getInstance(),
                            "User could not be saved",
                            Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
