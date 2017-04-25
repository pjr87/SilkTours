package com.silktours.android.database;

/**
 * Used to add url parameters to a url
 */
public class URIBuilder {
    private StringBuilder url;
    private boolean firstArg = true;

    public URIBuilder(String base) {
        url = new StringBuilder(base);
    }

    public void addParam(String name, String value) {
        url.append(firstArg?"?":"&")
                .append(name)
                .append("=")
                .append(value);
        firstArg = false;
    }

    public String build() {
        return url.toString();
    }
}
