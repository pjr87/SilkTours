package com.silktours.android.utils;

import com.amazonaws.auth.CognitoCachingCredentialsProvider;
import com.silktours.android.database.User;

/**
 * Created by andrew on 4/5/16.
 */
public class CredentialHandler {
    public static CognitoCachingCredentialsProvider credentialsProvider = null;
    public static String username = null;
    public static String email = null;
    public static User user;

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
