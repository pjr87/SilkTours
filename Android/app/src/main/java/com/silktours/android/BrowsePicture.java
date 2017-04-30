package com.silktours.android;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.net.URI;

public class BrowsePicture extends Activity {
    private static final int SELECT_PICTURE = 2;
    private OnImageSelected onImageSelected;

    public interface OnImageSelected {
        void selected(Uri uri);
    }

    public void getImage(OnImageSelected onImageSelected) {
        this.onImageSelected = onImageSelected;
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        MainActivity.getInstance().startActivityForResult(Intent.createChooser(intent,
                "Select Picture"), SELECT_PICTURE);
        MainActivity.getInstance().setBrowserPicture(this);
    }

    public void imageSelected(Uri uri) {
        onImageSelected.selected(uri);
    }
}
