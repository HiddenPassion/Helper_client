package com.helper.DetectHardware;

import android.app.Activity;
import android.graphics.Rect;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class DetectDisplay {
    public WritableMap getVisibleFrame(final Activity activity) {
        if (activity == null) {
            return Arguments.createMap();
        }
        Rect visibleFrame = new Rect();
        View decorView = activity.getWindow().getDecorView();
        decorView.getWindowVisibleDisplayFrame(visibleFrame);

        WritableMap map = Arguments.createMap();
        map.putInt("screenHeight", visibleFrame.bottom);
        map.putInt("screenWidth", visibleFrame.right);
        return map;
    }
}
