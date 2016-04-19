package com.baebae.reactnativecamera;

import com.baebae.reactnativecamera.cameralib.helpers.CameraInstanceManager;

import android.support.annotation.Nullable;
import android.view.View;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

public class CameraViewManager extends ViewGroupManager<CameraView> {
    public static final String REACT_CLASS = "CameraViewAndroid";
    private ReactApplicationContext reactApplicationContext = null;
    private CameraView cameraView = null;
    private CameraInstanceManager cameraInstanceManager;

    public CameraViewManager(ReactApplicationContext reactApplicationContext, CameraInstanceManager cameraInstanceManager) {
        this.reactApplicationContext = reactApplicationContext;
        this.cameraInstanceManager = cameraInstanceManager;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected CameraView createViewInstance(ThemedReactContext context) {
        cameraView = new CameraView(context, cameraInstanceManager);
        cameraView.startCamera();
        return cameraView;
    }

    @ReactProp(name = "startCapture")
    public void startCapture(CameraView view, @Nullable String flagValue) {
        String timeStamp = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss_").format(new Date());
        String fileName = timeStamp + UUID.randomUUID();
        view.setCapturedFileName(fileName);
        if (flagValue.equals("true")) {
            view.takePicture();
        }
    }

    @ReactProp(name = "torchMode")
    public void toggleTorch(CameraView view, @Nullable Boolean flagValue) {
        if (flagValue) {
            view.setFlash(true);
        } else {
            view.setFlash(false);
        }
    }

    @Override
    public void addView(CameraView parent, View child, int index) {
        parent.addView(child, index);
    }
}