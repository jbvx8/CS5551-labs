package com.example.anonymous.lab5;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.android.gms.maps.model.LatLng;

import java.util.List;

public class SignUpActivity extends AppCompatActivity {

    public Geocoder geocoder;
    Button photo_button, ok_button;
    EditText first, last, username, password, add;
    LatLng currentCoordinates = null;
    double latitude = 0, longitude = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        geocoder = new Geocoder(this);
        StringBuilder userAddress = new StringBuilder();
        first = (EditText) findViewById(R.id.signup_first);
        last = (EditText) findViewById(R.id.signup_last);
        username = (EditText) findViewById(R.id.signup_user);
        password = (EditText) findViewById(R.id.signup_password);
        photo_button = (Button) findViewById(R.id.signup_photoButton);
        ok_button = (Button) findViewById(R.id.signup_Button);

        LocationManager currentLocation = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        LocationListener currentLocationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {

            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }
        };



        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }

        currentLocation.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0,
                currentLocationListener);
        latitude = currentLocation.getLastKnownLocation(LocationManager.GPS_PROVIDER)
                .getLatitude();
        longitude = currentLocation.getLastKnownLocation(LocationManager.GPS_PROVIDER)
                .getLongitude();
        currentCoordinates = new LatLng(latitude, longitude);

        try {
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
            Address address = addresses.get(0);
            userAddress = new StringBuilder();
            for (int i = 0; i < address.getMaxAddressLineIndex(); i++) {
                userAddress.append(address.getAddressLine(i)).append("  ");
            }
            userAddress.append(address.getCountryName()).append("  ");
        } catch(Exception e) {
            e.printStackTrace();
        }
        add = (EditText) findViewById(R.id.signup_address);
        add.setText(userAddress);

    }

    public void onClickOK(View v) {
        if (first.getText().toString().equalsIgnoreCase("")){
            first.setError("Please enter a first name");
        } else if (last.getText().toString().equalsIgnoreCase("")) {
            last.setError("Please enter a last name");
        } else if (username.getText().toString().equalsIgnoreCase("")) {
            username.setError("Please enter a username");
        } else if (password.getText().toString().equalsIgnoreCase("")) {
            password.setError("Please enter a password");
        } else if (add.getText().toString().equalsIgnoreCase("")) {
            add.setError("Please enter an address");
        } else {
            Intent intent = new Intent(SignUpActivity.this, MapActivity.class);
            double[] coords = {latitude, longitude};
            intent.putExtra("COORDINATES", coords);
            startActivity(intent);
        }

    }
}
