package com.helper.DetectHardware;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class DetectHardwareModule extends ReactContextBaseJavaModule {
    private ReactContext _reactContext = null;

    public DetectHardwareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        _reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DetectHardware";
    }

    @ReactMethod
    public void getVisibleFrame(final Promise promise) {
        WritableMap map = new DetectDisplay().getVisibleFrame(_reactContext.getCurrentActivity());
        promise.resolve(map);
    }
}