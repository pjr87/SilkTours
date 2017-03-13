package com.silktours.android;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.applozic.mobicomkit.api.account.register.RegistrationResponse;
import com.applozic.mobicomkit.api.account.user.UserLoginTask;
import com.applozic.mobicomkit.api.conversation.service.ConversationService;
import com.applozic.mobicomkit.uiwidgets.conversation.ConversationUIService;
import com.applozic.mobicomkit.uiwidgets.conversation.activity.ConversationActivity;
import com.applozic.mobicommons.people.contact.Contact;
import com.braintreepayments.api.dropin.DropInActivity;
import com.braintreepayments.api.dropin.DropInRequest;
import com.braintreepayments.api.dropin.DropInResult;
import com.facebook.login.LoginManager;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.silktours.android.database.PaymentInfo;
import com.silktours.android.database.User;
import com.silktours.android.utils.CredentialHandler;
import com.silktours.android.utils.ErrorDisplay;

import org.json.JSONException;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {
    private static final String CURRENT_TAG = "CURRENT";
    private static final int REQUEST_CODE = 1;
    private static MainActivity instance = null;
    private MenuBar menu;
    private PaymentListener paymentListener;

    public static MainActivity getInstance() {
        return instance;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Toast.makeText(this, "OnCreate!!!", Toast.LENGTH_SHORT).show();
        instance = this;
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);

        findViewById(R.id.logoutButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //LoginManager.getInstance().logOut();
                CredentialHandler.logout(MainActivity.this);
            }
        });

        setSupportActionBar(toolbar);
        this.menu = new MenuBar();
        menu.setupClickListeners(this, toolbar);

        Fragment currentFragment = new Search();
        FragmentManager fragmentManager = getSupportFragmentManager();

        fragmentManager.beginTransaction()
                .replace(R.id.DefaultFrame, currentFragment, CURRENT_TAG)
                .commit();
    }

    public void login() {
        Intent intent = new Intent(MainActivity.this, LoginActivity.class);
        startActivity(intent);
    }

    public void logoutWithMessage() {
        ErrorDisplay.show("You need to login first", this);
        //LoginManager.getInstance().logOut();
        CredentialHandler.logout(MainActivity.this);
    }

    public void launchMessaging(final User to) {
        User user = CredentialHandler.getUser(this);
        if (user == null) {
            Toast.makeText(this, "Please login to continue.", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
            startActivity(intent);
        } else {
            launchMessaging(user, to);
        }
    }


    public void launchMessaging(final User from, final User to) {
        UserLoginTask.TaskListener listener = new UserLoginTask.TaskListener() {
            @Override
            public void onSuccess(RegistrationResponse registrationResponse, Context context) {
                // After successful registration with Applozic server the callback will come here
                //Intent intent = new Intent(this, MessageActivity.class);
                //startActivity(intent);
                Log.d("SilkSuccess", registrationResponse.getMessage());
                Intent intent = new Intent(MainActivity.this, MessageActivity.class);
                //Bundle bundle = new Bundle();
                if (to != null) {
                    Contact contact = new Contact(MainActivity.this, Integer.toString(to.getInt(User.ID_USERS)));
                    //intent.putExtra(ConversationActivity.CONTACT, contact);
                    //bundle.putSerializable(ConversationActivity.CONTACT, contact);
                    intent.putExtra(ConversationUIService.USER_ID, Integer.toString(to.getInt(User.ID_USERS)));
                    intent.putExtra(ConversationUIService.DISPLAY_NAME, (to.getStr(User.FIRST_NAME) + " " + to.getStr(User.LAST_NAME))); //put it for displaying the title.
                }
                //intent.putExtras(bundle);
                startActivity(intent);
            }

            @Override
            public void onFailure(RegistrationResponse registrationResponse, Exception exception) {
                // If any failure in registration the callback  will come here
                Log.d("SilkError", "Unknown Error");
            }};
        new com.applozic.mobicomkit.api.account.user.User();
        com.applozic.mobicomkit.api.account.user.User user = new com.applozic.mobicomkit.api.account.user.User();

        user.setUserId(Integer.toString(from.getInt(User.ID_USERS))); //userId it can be any unique user identifier
        user.setDisplayName(from.getStr(User.FIRST_NAME) + " " + from.getStr(User.LAST_NAME));
        user.setEmail(from.getStr(User.EMAIL));
        user.setAuthenticationTypeId(com.applozic.mobicomkit.api.account.user.User.AuthenticationType.APPLOZIC.getValue());  //User.AuthenticationType.APPLOZIC.getValue() for password verification from Applozic server and User.AuthenticationType.CLIENT.getValue() for access Token verification from your server set access token as password
        user.setPassword("silkpassword"); //optional, leave it blank for testing purpose, read this if you want to add additional security by verifying password from your server https://www.applozic.com/docs/configuration.html#access-token-url
        user.setImageLink(from.getStr(User.PROFILE_PICTURE));
        new UserLoginTask(user, listener, this).execute((Void) null);
    }

    public MenuBar getMenu() {
        return menu;
    }
    public interface PaymentListener {
        void done(boolean success);
    }
    public void processPayment(PaymentInfo paymentInfo, PaymentListener listener) {
        this.paymentListener = listener;
        DropInRequest dropInRequest = new DropInRequest()
                .clientToken("eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0YmI1NTA0ZmU1NDQ1NDQ3YzBkZTViNzhhOWRjZjQ1ZmNjYTU1MTE0NDA2NTM1Y2Q3YjE4YmU0ODNhYjFiMjA2fGNyZWF0ZWRfYXQ9MjAxNy0wMi0yM1QwMzo0MDowOC45MzI1MzMyNDgrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=");
        dropInRequest.amount(Double.toString(paymentInfo.amount));
        startActivityForResult(dropInRequest.getIntent(this), REQUEST_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                DropInResult result = data.getParcelableExtra(DropInResult.EXTRA_DROP_IN_RESULT);
                // use the result to update your UI and send the payment method nonce to your server
                Log.d("Payment", result.toString());
            } else if (resultCode == Activity.RESULT_CANCELED) {
                // the user canceled
            } else {
                // handle errors here, an exception may be available in
                Exception error = (Exception) data.getSerializableExtra(DropInActivity.EXTRA_ERROR);
                error.printStackTrace();
            }
            paymentListener.done(resultCode == Activity.RESULT_OK);
        }
    }

    public boolean googleServicesAvailable() {
        GoogleApiAvailability api = GoogleApiAvailability.getInstance();
        int isAvailable = api.isGooglePlayServicesAvailable(this);
        if (isAvailable == ConnectionResult.SUCCESS) {
            return true;
        } else if (api.isUserResolvableError(isAvailable)) {
            Dialog dialog = api.getErrorDialog(this, isAvailable, 0);
            dialog.show();
        } else {
            Toast.makeText(this, "Cant connect to play services", Toast.LENGTH_LONG).show();
        }
        return false;
    }



}
