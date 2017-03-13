package com.silktours.android.utils;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import com.amazonaws.auth.CognitoCachingCredentialsProvider;
import com.silktours.android.LoginActivity;
import com.silktours.android.MainActivity;
import com.silktours.android.database.User;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * Created by andrew on 4/5/16.
 */
public class CredentialHandler {
    private static final String PERSIST_LOCATION = "loggedInUser";
    public static CognitoCachingCredentialsProvider credentialsProvider = null;
    public static String username = null;
    public static String email = null;
    private static User user;
    private static long expireDate = 0;
    public static String logins = "";
    public static String identityId = "";



    public static void logout(Activity context) {
        expireDate = 0;
        if (user == null)
            user = new User();
        user.set(User.EXPIRE_TIME, expireDate);
        user.set(User.LOGINS, logins);
        user.set(User.IDENTITY_ID, identityId);
        persist(context);
        Intent intent = new Intent(context, LoginActivity.class);
        context.startActivity(intent);
        context.finish();
    }

    public static void persist(Activity context) {
        if (user == null) return;
        try {
            user.set(User.EXPIRE_TIME, expireDate);
            FileOutputStream fos = context.openFileOutput(PERSIST_LOCATION, Context.MODE_PRIVATE);
            ObjectOutputStream os = new ObjectOutputStream(fos);
            os.writeObject(user.JSON.toString());
            os.close();
            fos.close();
        }catch(IOException e) {
            e.printStackTrace();
        }
    }

    public static void load(Activity context) {
        try {
            FileInputStream fis = context.openFileInput(PERSIST_LOCATION);
            ObjectInputStream is = new ObjectInputStream(fis);
            user = new User();
            user.JSON = new JSONObject((String)is.readObject());
            Object o_exireDate = user.get(User.EXPIRE_TIME);
            if (o_exireDate == null) {
                user = null;
                expireDate = 0;
                return;
            }
            logins = user.getStr(User.LOGINS);
            identityId = user.getStr(User.IDENTITY_ID);
            expireDate = ((Number) o_exireDate).longValue();
            if (expireDate < System.currentTimeMillis()) {
                user = null;
            }
            is.close();
            fis.close();
        }catch(IOException | ClassNotFoundException | JSONException e) {
            e.printStackTrace();
        }
    }

    public static User getUser(Activity context) {
        if (user == null) {
            load(context);
        }
        if (System.currentTimeMillis() < expireDate) {
            refresh(context);
            return user;
        }
        refresh(context);
        return null;
    }

    public static void setUser(Activity context, User user, long expireDate) {
        CredentialHandler.expireDate = expireDate;
        CredentialHandler.user = user;
        persist(context);
    }

    public static void refresh(Activity context) {
        if (credentialsProvider == null)
            return;
        credentialsProvider.refresh();
        expireDate = credentialsProvider.getSessionCredentitalsExpiration().getTime();
        persist(context);
    }

    public static final String identityPoolId = "us-east-1:5d00c8d9-83d3-47d3-ad69-8fd5b8b70349";
    public static final String userPoolId = "us-east-1_917Igx5Ld";
    public static final String clientId = "2bs9l9t5ol4m09fgfmadk3jmh7";
    public static final String awsAccountId = "803858137669";
    public static final String region = "us-east-1";

    //Facebook
    public static final String facebookAppId= "606443696175641";
    public static final String facebookAppSecret = "aea0d287a34debcb3e540b829c66b5db";
    public static final String facebookVersion = "v2.5";
}
