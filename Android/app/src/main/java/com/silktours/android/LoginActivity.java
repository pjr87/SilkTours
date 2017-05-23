package com.silktours.android;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Looper;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.app.LoaderManager.LoaderCallbacks;

import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;

import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.ClientConfiguration;
import com.amazonaws.auth.CognitoCachingCredentialsProvider;
import com.amazonaws.mobileconnectors.cognito.CognitoSyncManager;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUser;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserAttributes;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserCodeDeliveryDetails;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserPool;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserSession;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.AuthenticationContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.AuthenticationDetails;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.MultiFactorAuthenticationContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.AuthenticationHandler;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.GenericHandler;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.SignUpHandler;
import com.amazonaws.regions.Regions;
import com.applozic.mobicomkit.api.account.register.RegistrationResponse;
import com.facebook.*;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.google.android.gms.auth.GoogleAuthException;
import com.google.android.gms.auth.GoogleAuthUtil;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.silktours.android.database.Common;
import com.silktours.android.database.User;
import com.silktours.android.utils.CreateUserPrompt;
import com.silktours.android.utils.CredentialHandler;
import com.silktours.android.utils.ErrorDisplay;
import com.silktours.android.utils.StringPrompt;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import static android.Manifest.permission.READ_CONTACTS;

/**
 * A login screen that offers login via email/password.
 */
public class LoginActivity extends AppCompatActivity implements LoaderCallbacks<Cursor> {

    /**
     * Id to identity READ_CONTACTS permission request.
     */
    private static final int REQUEST_READ_CONTACTS = 0;
    private static final int REQUEST_GOOGLE_LOGIN = 2;

    /**
     * A dummy authentication store containing known user names and passwords.
     * TODO: remove after connecting to a real authentication system.
     */
    private static final String[] DUMMY_CREDENTIALS = new String[]{
            "foo@example.com:hello", "bar@example.com:world"
    };
    /**
     * Keep track of the login task to ensure we can cancel it if requested.
     */
    private UserLoginTask mAuthTask = null;

    // UI references.
    private AutoCompleteTextView mEmailView;
    private EditText mPasswordView;
    private View mProgressView;
    private View mProgressLayout;
    private View mLoginFormView;
    private TextView mProgressMsg;
    private CallbackManager callbackManager;
    private CognitoCachingCredentialsProvider credentialsProvider;
    private CognitoSyncManager syncClient;
    private String mEmail;
    private String mPassword;
    private CognitoUserPool userPool;
    private boolean authSuccess = false;
    private CountDownLatch loginLatch;
    private Class<?> resumeClass = null;
    private Bundle resumeBundle;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = getIntent();
        if (intent != null) {
            Serializable s_resume_session = intent.getSerializableExtra("resumeClass");
            this.resumeBundle = intent.getBundleExtra("resumeArguments");
            if (s_resume_session != null) {
                this.resumeClass = (Class<?>) s_resume_session;
            }
        }
        FacebookSdk.sdkInitialize(getApplicationContext());
        setContentView(R.layout.activity_login);
        setupFacebook();
        setupGoogle();
        // Set up the login form.
        mEmailView = (AutoCompleteTextView) findViewById(R.id.email);
        populateAutoComplete();

        mPasswordView = (EditText) findViewById(R.id.password);
        mPasswordView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
                if (id == R.id.login || id == EditorInfo.IME_NULL) {
                    attemptLogin();
                    return true;
                }
                return false;
            }
        });

        SharedPreferences sp = LoginActivity.this.getPreferences(MODE_PRIVATE);
        mEmail = sp.getString("email", "");
        mPassword = sp.getString("password", "");
        mEmailView.setText(mEmail);
        mPasswordView.setText(mPassword);

        Button mEmailSignInButton = (Button) findViewById(R.id.email_sign_in_button);
        mEmailSignInButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });

        mLoginFormView = findViewById(R.id.login_form);
        mProgressView = findViewById(R.id.login_progress);
        mProgressLayout = findViewById(R.id.login_progress_layout);
        mProgressMsg = (TextView) findViewById(R.id.login_progress_msg);

        credentialsProvider = new CognitoCachingCredentialsProvider(
                getApplication(),
                CredentialHandler.identityPoolId,
                Regions.US_EAST_1
        );
        credentialsProvider.clear();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        callbackManager.onActivityResult(requestCode,
                resultCode, data);
        if (requestCode == REQUEST_GOOGLE_LOGIN) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    googleResultsHandler(data);
                }
            }).start();
        }
    }

    private void googleResultsHandler(Intent data) {
        GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
        if (result.isSuccess()) {
            // Signed in successfully, show authenticated UI.
            GoogleSignInAccount acct = result.getSignInAccount();
            if (acct == null) {
                ErrorDisplay.show("Could not locate Google account", LoginActivity.this);
                return;
            }
            String email = acct.getEmail();
            String picture = null;
            if (acct.getPhotoUrl() != null)
                picture = acct.getPhotoUrl().getPath();
            String name = acct.getDisplayName();
            String accessToken;// = acct.getServerAuthCode();
            AccountManager am = AccountManager.get(this);
            Account[] accounts = am.getAccountsByType(GoogleAuthUtil.GOOGLE_ACCOUNT_TYPE);
            try {
                String client = "929115108443-trd037hvikplhqse596n0t5ufniggt08.apps.googleusercontent.com";
                client  = "audience:server:client_id:" + client;
                accessToken = GoogleAuthUtil.getToken(LoginActivity.this, accounts[0], client);
                Log.d("SilkToken", accessToken);
            } catch (IOException | GoogleAuthException e) {
                e.printStackTrace();
                ErrorDisplay.show("Error signing in", LoginActivity.this);
                return;
            }
            final Map<String, String> logins = new HashMap<>();
            logins.put("accounts.google.com", accessToken);
            credentialsProvider.setLogins(logins);
            CredentialHandler.credentialsProvider = credentialsProvider;
            syncClient = new CognitoSyncManager(
                    getApplication(),
                    Regions.US_EAST_1,
                    credentialsProvider
            );
            finalizeLogin(email, name, picture, logins, System.currentTimeMillis()*2);
        } else {
            ErrorDisplay.show("Unable to Login using Google", LoginActivity.this);
        }
    }

    private void setupGoogle() {
        findViewById(R.id.google_signin_button).setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                showProgress(true);
                GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestEmail()
                        .build();
                GoogleApiClient mGoogleApiClient = new GoogleApiClient.Builder(LoginActivity.this)
                        .enableAutoManage(LoginActivity.this /* FragmentActivity */, null /* OnConnectionFailedListener */)
                        .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
                        .build();

                Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
                startActivityForResult(signInIntent, REQUEST_GOOGLE_LOGIN);
            }
        });
    }
    
    private void setupFacebook() {
        // Facebook SDK
        callbackManager = CallbackManager.Factory.create();
        LoginButton loginButton = (LoginButton)findViewById(R.id.login_button);
        loginButton.setReadPermissions("public_profile");
        LoginManager.getInstance().registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(final LoginResult loginResult) {
                showProgress(true);
                final Map<String, String> logins = new HashMap<>();
                String accessToken = loginResult.getAccessToken().getToken();
                logins.put("graph.facebook.com", accessToken);
                credentialsProvider.setLogins(logins);
                CredentialHandler.credentialsProvider = credentialsProvider;
                syncClient = new CognitoSyncManager(
                        getApplication(),
                        Regions.US_EAST_1,
                        credentialsProvider
                );

                setProgress("Getting data from Facebook");
                getFBInfo(loginResult, new GetFBInfoCallback() {
                    @Override
                    public void done(String email, String name, String picture) {
                        finalizeLogin(email, name, picture, logins, loginResult.getAccessToken().getExpires().getTime());
                    }
                });
            }

            @Override
            public void onCancel() {
                Log.d("Silk", "On cancel");
            }

            @Override
            public void onError(FacebookException e) {
                Log.d("Silk", "On error");
            }
        });
    }

    private void finalizeLogin(String email, String name, String picture, Map<String, String> logins, long expireTime) {
        User user = null;
        CredentialHandler.logins = new JSONObject(logins).toString();
        CredentialHandler.identityId = credentialsProvider.getIdentityId();
        try {
            setProgress("Getting user information");
            user = User.getByEmail(email);
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
        if (user == null) {
            String[] names = name.split(" ");
            user = new User();
            user.set(User.EMAIL, email);
            user.set(User.FIRST_NAME, names[0]);
            if (names.length > 1) {
                user.set(User.LAST_NAME, names[names.length - 1]);
            }
            if (picture != null)
                user.set(User.PROFILE_PICTURE, picture);
            try {
                setProgress("Creating new user");
                user.create();
                CredentialHandler.setUser(LoginActivity.this,
                        user,
                        expireTime,
                        credentialsProvider.getIdentityId(),
                        new JSONObject(logins).toString());
                applozicSignup(user);
                setProgress("Done. Going Home...");
                goHome();
                finish();
                return;
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            setProgress("Logging user in");
            credentialsProvider.refresh();
            CredentialHandler.setUser(LoginActivity.this,
                    user,
                    expireTime,
                    credentialsProvider.getIdentityId(),
                    new JSONObject(logins).toString());
            if (Common.checkAuth(logins, credentialsProvider.getIdentityId())) {
                applozicSignup(user);
                setProgress("Done. Going Home...");
                goHome();
                finish();
                return;
            } else {
                ErrorDisplay.show("Failed to login in user. Please try again.", LoginActivity.this);
                LoginActivity.this.recreate();
            }
        }
        LoginActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(LoginActivity.this, "Failed to Login", Toast.LENGTH_SHORT).show();
            }
        });
    }

    /*private void signUpCognito(String email) {
        SignUpHandler signupCallback = new SignUpHandler() {
            @Override
            public void onSuccess(CognitoUser cognitoUser, boolean userConfirmed, CognitoUserCodeDeliveryDetails cognitoUserCodeDeliveryDetails) {
                if(!userConfirmed) {
                    // This user must be confirmed and a confirmation code was sent to the user
                    // cognitoUserCodeDeliveryDetails will indicate where the confirmation code was sent
                    // Get the confirmation code from user
                }
                else {
                    // The user has already been confirmed
                }
            }

            @Override
            public void onFailure(Exception exception) {
                // Sign-up failed, check exception for the cause
            }
        };
        CognitoUserAttributes userAttributes = new CognitoUserAttributes();
        userAttributes.addAttribute("email", email);
        CognitoUserPool userPool;
        userPool.signUpInBackground(userId, password, userAttributes, null, signupCallback);
    }*/

    private void launchCreateUser(String email, String name, String picture) {
        Intent intent = new Intent(this, SignUp.class);
        this.startActivity(intent);
    }

    private interface GetFBInfoCallback {
        void done(String email, String name, String picture);
    }
    private void getFBInfo(LoginResult result, final GetFBInfoCallback callback) {
        GraphRequest request = GraphRequest.newMeRequest(AccessToken.getCurrentAccessToken(), new GraphRequest.GraphJSONObjectCallback() {
            @Override
            public void onCompleted(JSONObject object, final GraphResponse response) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        JSONObject json = response.getJSONObject();
                        try {
                            if(json != null){
                                callback.done(
                                        json.getString("email"),
                                        json.getString("name"),
                                        json.getString("picture")
                                );
                            }
                        } catch (JSONException e) {
                            callback.done(null, null, null);
                        }
                    }
                }).start();
            }
        });
        Bundle parameters = new Bundle();
        parameters.putString("fields", "id,name,link,email,picture");
        request.setParameters(parameters);
        request.executeAsync();
    }

    private void goHome() {
        if (resumeClass != null) {
            finish();
            try {
                Fragment fragment = (Fragment) resumeClass.getConstructor().newInstance();
                if (this.resumeBundle != null)
                    fragment.setArguments(this.resumeBundle);
                MainActivity.getInstance().getMenu().startFragment(fragment);
                return;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Intent intent = new Intent(this, MainActivity.class);
        this.startActivity(intent);
        finish();
    }

    private void populateAutoComplete() {
        if (!mayRequestContacts()) {
            return;
        }

        getLoaderManager().initLoader(0, null, this);
    }

    private boolean mayRequestContacts() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            return true;
        }
        if (checkSelfPermission(READ_CONTACTS) == PackageManager.PERMISSION_GRANTED) {
            return true;
        }
        if (shouldShowRequestPermissionRationale(READ_CONTACTS)) {
            Snackbar.make(mEmailView, R.string.permission_rationale, Snackbar.LENGTH_INDEFINITE)
                    .setAction(android.R.string.ok, new View.OnClickListener() {
                        @Override
                        @TargetApi(Build.VERSION_CODES.M)
                        public void onClick(View v) {
                            requestPermissions(new String[]{READ_CONTACTS}, REQUEST_READ_CONTACTS);
                        }
                    });
        } else {
            requestPermissions(new String[]{READ_CONTACTS}, REQUEST_READ_CONTACTS);
        }
        return false;
    }

    /**
     * Callback received when a permissions request has been completed.
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        if (requestCode == REQUEST_READ_CONTACTS) {
            if (grantResults.length == 1 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                populateAutoComplete();
            }
        }
    }

    /**
     * Attempts to sign in or register the account specified by the login form.
     * If there are form errors (invalid email, missing fields, etc.), the
     * errors are presented and no actual login attempt is made.
     */
    private void attemptLogin() {
        if (mAuthTask != null) {
            return;
        }

        // Reset errors.
        mEmailView.setError(null);
        mPasswordView.setError(null);

        // Store values at the time of the login attempt.
        String email = mEmailView.getText().toString();
        String password = mPasswordView.getText().toString();

        boolean cancel = false;
        View focusView = null;

        // Check for a valid password, if the user entered one.
        if (!isPasswordValid(password)) {
            mPasswordView.setError(getString(R.string.error_invalid_password));
            focusView = mPasswordView;
            cancel = true;
        }

        // Check for a valid email address.
        if (TextUtils.isEmpty(email)) {
            mEmailView.setError(getString(R.string.error_field_required));
            focusView = mEmailView;
            cancel = true;
        } else if (!isEmailValid(email)) {
            mEmailView.setError(getString(R.string.error_invalid_email));
            focusView = mEmailView;
            cancel = true;
        }

        if (cancel) {
            // There was an error; don't attempt login and focus the first
            // form field with an error.
            focusView.requestFocus();
        } else {
            // Show a progress spinner, and kick off a background task to
            // perform the user login attempt.
            showProgress(true);
            mAuthTask = new UserLoginTask(email, password);
            mAuthTask.execute((Void) null);
        }
    }

    private boolean isEmailValid(String email) {
        return email.length() >= 5 && email.contains("@") && email.contains(".");
    }

    private boolean isPasswordValid(String password) {
        // Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number
        return true;//password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
    }

    /**
     * Shows the progress UI and hides the login form.
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    private void showProgress(final boolean show) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

            mLoginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
            mLoginFormView.animate().setDuration(shortAnimTime).alpha(
                    show ? 0 : 1).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    mLoginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
                }
            });

            mProgressLayout.setVisibility(show ? View.VISIBLE : View.GONE);
            mProgressView.animate().setDuration(shortAnimTime).alpha(
                    show ? 1 : 0).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    mProgressLayout.setVisibility(show ? View.VISIBLE : View.GONE);
                }
            });
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            mProgressLayout.setVisibility(show ? View.VISIBLE : View.GONE);
            mLoginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
        }
    }

    private void setProgress(final String msg) {
        if (Looper.getMainLooper().getThread() == Thread.currentThread()) {
            mProgressMsg.setText(msg);
        } else {
            this.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    setProgress(msg);
                }
            });
        }
    }

    @Override
    public Loader<Cursor> onCreateLoader(int i, Bundle bundle) {
        return new CursorLoader(this,
                // Retrieve data rows for the device user's 'profile' contact.
                Uri.withAppendedPath(ContactsContract.Profile.CONTENT_URI,
                        ContactsContract.Contacts.Data.CONTENT_DIRECTORY), ProfileQuery.PROJECTION,

                // Select only email addresses.
                ContactsContract.Contacts.Data.MIMETYPE +
                        " = ?", new String[]{ContactsContract.CommonDataKinds.Email
                .CONTENT_ITEM_TYPE},

                // Show primary email addresses first. Note that there won't be
                // a primary email address if the user hasn't specified one.
                ContactsContract.Contacts.Data.IS_PRIMARY + " DESC");
    }

    @Override
    public void onLoadFinished(Loader<Cursor> cursorLoader, Cursor cursor) {
        List<String> emails = new ArrayList<>();
        cursor.moveToFirst();
        while (!cursor.isAfterLast()) {
            emails.add(cursor.getString(ProfileQuery.ADDRESS));
            cursor.moveToNext();
        }

        addEmailsToAutoComplete(emails);
    }

    @Override
    public void onLoaderReset(Loader<Cursor> cursorLoader) {

    }

    private void addEmailsToAutoComplete(List<String> emailAddressCollection) {
        //Create adapter to tell the AutoCompleteTextView what to show in its dropdown list.
        ArrayAdapter<String> adapter =
                new ArrayAdapter<>(LoginActivity.this,
                        android.R.layout.simple_dropdown_item_1line, emailAddressCollection);

        mEmailView.setAdapter(adapter);
    }


    private interface ProfileQuery {
        String[] PROJECTION = {
                ContactsContract.CommonDataKinds.Email.ADDRESS,
                ContactsContract.CommonDataKinds.Email.IS_PRIMARY,
        };

        int ADDRESS = 0;
        int IS_PRIMARY = 1;
    }

    private void applozicSignup(User silkUser) {
        com.applozic.mobicomkit.api.account.user.UserLoginTask.TaskListener listener = new com.applozic.mobicomkit.api.account.user.UserLoginTask.TaskListener() {
            @Override
            public void onSuccess(RegistrationResponse registrationResponse, Context context) {
                Log.d("Applozic", "Signup Successfull");
            }

            @Override
            public void onFailure(RegistrationResponse registrationResponse, Exception exception) {
                // If any failure in registration the callback  will come here
                Log.d("Applozic", "Unknown Error");
            }};
        new com.applozic.mobicomkit.api.account.user.User();
        com.applozic.mobicomkit.api.account.user.User user = new com.applozic.mobicomkit.api.account.user.User();
        user.setUserId(Integer.toString(silkUser.getInt(User.ID_USERS))); //userId it can be any unique user identifier
        user.setDisplayName(silkUser.getStr(User.FIRST_NAME) + " " + silkUser.getStr(User.LAST_NAME));
        user.setEmail(silkUser.getStr(User.EMAIL));
        user.setAuthenticationTypeId(com.applozic.mobicomkit.api.account.user.User.AuthenticationType.APPLOZIC.getValue());  //User.AuthenticationType.APPLOZIC.getValue() for password verification from Applozic server and User.AuthenticationType.CLIENT.getValue() for access Token verification from your server set access token as password
        //user.setPassword(""); //optional, leave it blank for testing purpose, read this if you want to add additional security by verifying password from your server https://www.applozic.com/docs/configuration.html#access-token-url
        user.setImageLink(silkUser.getStr(User.PROFILE_PICTURE));
        new com.applozic.mobicomkit.api.account.user.UserLoginTask(user, listener, this).execute((Void) null);
    }

    AuthenticationHandler authHandler = new AuthenticationHandler() {
        @Override
        public void onSuccess(CognitoUserSession userSession) {
            try {
                Map<String, String> logins = new HashMap<>();
                logins.put("cognito-idp.us-east-1.amazonaws.com/us-east-1_917Igx5Ld", userSession.getIdToken().getJWTToken());
                credentialsProvider.clear();
                credentialsProvider.setLogins(logins);
                setProgress("Fetching user profile");
                User user = User.getByEmail(mEmail);
                CredentialHandler.setUser(
                        LoginActivity.this,
                        user,
                        userSession.getAccessToken().getExpiration().getTime(),
                        credentialsProvider.getIdentityId(),
                        new JSONObject(logins).toString()
                );
                applozicSignup(user);
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
            loginDone(true);
        }

        @Override
        public void getAuthenticationDetails(final AuthenticationContinuation authenticationContinuation, String UserId) {
            AuthenticationDetails authDetails = new AuthenticationDetails(mEmail, mPassword, null);

            // Now allow the authentication to continue
            authenticationContinuation.setAuthenticationDetails(authDetails);
            new Thread(new Runnable() {
                @Override
                public void run() {
                    authenticationContinuation.continueTask();
                }
            }).start();
        }

        @Override
        public void getMFACode(MultiFactorAuthenticationContinuation continuation) {

        }

        @Override
        public void onFailure(Exception exception) {
            if (! (exception instanceof AmazonServiceException)) {
                ErrorDisplay.show("An unexpected error occurred:\n" + exception.getMessage(), LoginActivity.this);
                exception.printStackTrace();
                return;
            }
            AmazonServiceException serviceException = (AmazonServiceException) exception;
            if (serviceException.getErrorCode().equals("UserNotFoundException")) {
                CognitoUserAttributes userAttributes = new CognitoUserAttributes();
                userAttributes.addAttribute("email", mEmail);
                setProgress("Creating new user");
                userPool.signUp(mEmail, mPassword, userAttributes, null, signupCallback);
            }else if (serviceException.getErrorCode().toLowerCase().contains("confirm")) {
                confirmUser(userPool.getUser(mEmail));
            }
        }
    };

    SignUpHandler signupCallback = new SignUpHandler() {
        @Override
        public void onSuccess(final CognitoUser cognitoUser, final boolean userConfirmed, final CognitoUserCodeDeliveryDetails cognitoUserCodeDeliveryDetails) {
            CreateUserPrompt prompt = new CreateUserPrompt();
            prompt.promptUIThread(LoginActivity.this, new CreateUserPrompt.CreateUserPromptListener() {
                @Override
                public void onResult(List<String> keys, List<String> values) {
                    Log.d("SilkKeys", keys.toString());
                    Log.d("SilkValues", values.toString());
                    User user = new User();
                    user.set(User.EMAIL, mEmail);
                    user.set(User.FIRST_NAME, values.get(0));
                    user.set(User.LAST_NAME, values.get(1));
                    user.set(User.PHONE_NUMBER, values.get(2));
                    user.set(User.ADDRESS + ":" + "street", values.get(3));
                    try {
                        user.create();
                        if (!userConfirmed) {
                            confirmUser(cognitoUser);
                        } else {
                            loginDone(true);
                            cognitoUser.getSession(authHandler);
                        }
                    } catch (IOException e) {
                        ErrorDisplay.show("Error Creating User: \n" + e.getMessage(), LoginActivity.this);
                        showProgress(false);
                        e.printStackTrace();
                    }
                }

                @Override
                public void onCancel() {
                    ErrorDisplay.show("Signup Process Canceled", LoginActivity.this);
                    showProgress(false);
                }
            });
        }

        @Override
        public void onFailure(Exception exception) {
            loginDone(false);
        }
    };

    private void confirmUser(final CognitoUser cognitoUser) {
        setProgress("Enter confirmation code");
        StringPrompt.promptInUIThread("A confirmation code has been sent to " + mEmail + ". Please enter the code below.",
                LoginActivity.this,
                new StringPrompt.StringPromptListener() {
                    @Override
                    public void onResult(String result) {
                        setProgress("Confirming user");
                        cognitoUser.confirmSignUpInBackground(result, false, new GenericHandler() {
                            @Override
                            public void onSuccess() {
                                setProgress("User confirmed, getting session");
                                cognitoUser.getSession(authHandler);
                            }

                            @Override
                            public void onFailure(Exception exception) {
                                ErrorDisplay.show("Confirmation Code is Incorrect", LoginActivity.this);
                                confirmUser(cognitoUser);
                            }
                        });
                    }
                });
    }

    void loginDone(boolean status) {
        setProgress(status?"Login successful":"Login unsuccessful");
        authSuccess = status;
        loginLatch.countDown();
    }

    /**
     * Represents an asynchronous login/registration task used to authenticate
     * the user.
     */
    public class UserLoginTask extends AsyncTask<Void, Void, Boolean> {
        UserLoginTask(String email, String password) {
            mEmail = email;
            mPassword = password;
        }

        @Override
        protected Boolean doInBackground(Void... params) {
            loginLatch = new CountDownLatch (1);
            ClientConfiguration clientConfiguration = new ClientConfiguration();
            userPool = new CognitoUserPool(
                    LoginActivity.this,
                    CredentialHandler.userPoolId,
                    CredentialHandler.clientId,
                    null,
                    clientConfiguration);
            SharedPreferences sp = LoginActivity.this.getPreferences(MODE_PRIVATE);
            SharedPreferences.Editor editor = sp.edit();
            editor.putString("email", mEmail);
            editor.putString("password", mPassword);
            editor.apply();
            setProgress("Logging in user");
            userPool.getUser(mEmail).authenticateUser(new AuthenticationDetails(mEmail, mPassword, null), authHandler);

            try {
                loginLatch.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return authSuccess;
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            mAuthTask = null;
            showProgress(false);

            if (success) {
                goHome();
            } else {
                ErrorDisplay.show("Incorrect Password", LoginActivity.this);
                mPasswordView.setError(getString(R.string.error_incorrect_password));
                mPasswordView.requestFocus();
            }
        }

        @Override
        protected void onCancelled() {
            mAuthTask = null;
            loginDone(false);
            showProgress(false);
        }
    }
}

