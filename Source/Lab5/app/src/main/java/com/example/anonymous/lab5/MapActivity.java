package com.example.anonymous.lab5;

import android.content.Intent;
import android.graphics.Bitmap;
import android.location.Geocoder;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.Serializable;

public class MapActivity extends FragmentActivity implements OnMapReadyCallback{
    private GoogleMap gMap;
    public Geocoder geocoder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        gMap = googleMap;
        geocoder = new Geocoder(this);
        double[] userCoordinates = getIntent().getDoubleArrayExtra("COORDINATES");
        double lat = userCoordinates[0];
        double lng = userCoordinates[1];
        LatLng coordinates = new LatLng(lat, lng);
        String latlong = lat + ", " + lng;
        try {
            Intent intent = getIntent();
            Bitmap photo = intent.getParcelableExtra("UserImage");
            if (photo != null) {
                gMap.addMarker(new MarkerOptions().position(coordinates)
                        .title(latlong)
                        .icon(BitmapDescriptorFactory.fromBitmap(photo)));
            } else {
                gMap.addMarker(new MarkerOptions().position(coordinates)
                        .title(latlong)
                        .icon(BitmapDescriptorFactory.fromResource(R.drawable.android)));
            }
            gMap.moveCamera(CameraUpdateFactory.newLatLngZoom(coordinates, 14));
        } catch (Exception e) {
            e.printStackTrace();
        }



    }
}
