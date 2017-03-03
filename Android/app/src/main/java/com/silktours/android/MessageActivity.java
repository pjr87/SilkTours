package com.silktours.android;

import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.widget.LinearLayout;

import com.applozic.mobicomkit.uiwidgets.conversation.activity.ConversationActivity;

/**
 * Created by andrew on 3/3/17.
 */
public class MessageActivity extends ConversationActivity {
    MenuBar menu;

    @Override
    public void onCreate(Bundle b) {
        super.onCreate(b);
        this.menu = new MenuBar();
        menu.setupClickListeners(this, null);
    }

    @Override
    public void setContentView(int r) {
        super.setContentView(R.layout.message_wrapper);
        LinearLayout message_holder = (LinearLayout) findViewById(R.id.message_holder);
        LayoutInflater inflater = LayoutInflater.from(this);
        inflater.inflate(r, message_holder);
    }

    @Override
    public void setSupportActionBar(Toolbar toolbar) {

    }
}
