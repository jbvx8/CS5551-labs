package com.example.anonymous.lab4;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class RegisterActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

    public void register(View v) {
        EditText registerUser = (EditText)findViewById(R.id.registerUserName);
        EditText registerPass = (EditText) findViewById(R.id.registerPassword);
        TextView errorText = (TextView)findViewById(R.id.textRegisterError);
        String userName = registerUser.getText().toString();
        String password = registerPass.getText().toString();

        boolean validationFlag = false;
        //Verify if the username and password are not empty.
        if(!userName.isEmpty() && !password.isEmpty()) {
            Intent redirect = new Intent(RegisterActivity.this, MainActivity.class);
            startActivity(redirect);
        }
        else
        {
            errorText.setVisibility(View.VISIBLE);
        }

    }

}
