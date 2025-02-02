package com.silktours.android;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.media.Image;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.util.Base64;
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

import com.google.android.gms.location.places.Place;
import com.silktours.android.database.User;
import com.silktours.android.utils.CreateUserPrompt;
import com.silktours.android.utils.CredentialHandler;
import com.silktours.android.utils.ErrorDisplay;
import com.silktours.android.utils.LocationPrompt;
import com.silktours.android.utils.URIHelper;
import com.yalantis.ucrop.UCrop;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.ByteArrayOutputStream;
import java.io.File;
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
    private int id_user = -1;
    private boolean editable = false;
    private int MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        if (getArguments() != null)
            this.id_user = this.getArguments().getInt("id_user", -1);
        rootView = inflater.inflate(R.layout.content_profile, container, false);
        firstName = (EditText) rootView.findViewById(R.id.firstName);
        lastName = (EditText) rootView.findViewById(R.id.lastName);
        phoneNumber = (EditText) rootView.findViewById(R.id.phoneNumber);
        email = (EditText) rootView.findViewById(R.id.email);
        location = (TextView) rootView.findViewById(R.id.locationTextView);
        profileImage = (ImageView) rootView.findViewById(R.id.profileImage);
        profileImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setProfileImage();
            }
        });
        filloutFields();
        setUpListeners();
        return rootView;
    }

    /*
    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                    // permission was granted, yay! Do the
                    // contacts-related task you need to do.

                } else {

                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                }
                return;
            }

            // other 'case' lines to check for other
            // permissions this app might request
        }
    }
*/
    private void setProfileImage() {

        if (ContextCompat.checkSelfPermission(MainActivity.getInstance(), Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {

            // Should we show an explanation?
            if (shouldShowRequestPermissionRationale(
                    Manifest.permission.READ_EXTERNAL_STORAGE)) {
                // Explain to the user why we need to read the contacts
            }

            requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                    MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE);

            // MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE is an
            // app-defined int constant that should be quite unique

            //return;
        }

        MainActivity.getImage(true, new MainActivity.GetImageResult() {
            @Override
            public void onResult(String path) {
                Log.d("SilkPath", path);
                Bitmap bm;
                try {
                    bm = MediaStore.Images.Media.getBitmap(MainActivity.getInstance().getContentResolver(), Uri.parse("file://" + path));
                } catch (IOException e) {
                    e.printStackTrace();
                    return;
                }
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                bm.compress(Bitmap.CompressFormat.PNG, 100, baos);
                byte[] b = baos.toByteArray();
                final String encodedImage = Base64.encodeToString(b, Base64.DEFAULT);
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            User user = CredentialHandler.getUser(MainActivity.getInstance());
                            if (user != null)
                                user.editProfileImage("test.png", encodedImage);
                            resetImage();
                        } catch (IOException | JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
            }
        });
    }

    private void resetImage() {
        MainActivity.getInstance().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                filloutFields();
            }
        });
    }

    private void filloutFields() {
        if (id_user == -1) {
            user = CredentialHandler.getUser(MainActivity.getInstance());
            if (user == null) {
                MainActivity.getInstance().login(Profile.this);
                return;
            }
            editable = true;
        }else{
            Button button = (Button) rootView.findViewById(R.id.saveProfile);
            button.setText("Message");
            firstName.setKeyListener(null);
            lastName.setKeyListener(null);
            phoneNumber.setKeyListener(null);
            email.setKeyListener(null);
            location.setKeyListener(null);
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
                    public void onLocationSet(String location, Place place) {
                        if (location != null) {
                            TextView locationView = (TextView) rootView.findViewById(R.id.locationTextView);
                            locationView.setText(location);
                        }
                    }
                });
            }
        });
        if (!editable)
            locationEdit.setVisibility(View.GONE);

        Button saveButton = (Button) rootView.findViewById(R.id.saveProfile);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (user == null) return;
                if (!editable) {
                    MainActivity.getInstance().launchMessaging(user);
                }else {
                    user.set("address:street", location.getText().toString());
                    user.set(User.EMAIL, email.getText().toString());
                    user.set(User.PHONE_NUMBER, phoneNumber.getText().toString());
                    user.set(User.LAST_NAME, lastName.getText().toString());
                    user.set(User.FIRST_NAME, firstName.getText().toString());
                    commitUser();
                }
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
