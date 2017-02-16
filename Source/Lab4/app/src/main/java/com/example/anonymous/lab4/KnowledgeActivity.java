package com.example.anonymous.lab4;

import android.app.DownloadManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


public class KnowledgeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_knowledge);
    }

    public void search(View v) {
        final TextView sourceTextView = (TextView) findViewById(R.id.inputSearch);
        final TextView outputTextView = (TextView) findViewById(R.id.outputText);

        String sourceText = sourceTextView.getText().toString();
        String getURL = "https://kgsearch.googleapis.com/v1/entities:search?query=" + sourceText + "&key=AIzaSyBXIgU_8ov_uiEpjBscNOr5axYwoyjr3yY&limit=1&indent=True";//The API service URL
        final String response1 = "";
        OkHttpClient client = new OkHttpClient();
        try {
            Request request = new Request.Builder()
                    .url(getURL)
                    .build();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    final JSONObject jsonResult;
                    final String result = response.body().string();
                    try {
                        jsonResult = new JSONObject(result);
                        final String resultString = jsonResult.getJSONArray("itemListElement").getJSONObject(0).getJSONObject("result").getJSONObject("detailedDescription").getString("articleBody"); //.getJSONObject("detailedDescription").getString("articleBody");
                        Log.d("okHttp", jsonResult.toString());
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                outputTextView.setText(resultString);
                            }
                        });
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });


        } catch (Exception ex) {
            sourceTextView.setText(ex.getMessage());

        }

    }
}
