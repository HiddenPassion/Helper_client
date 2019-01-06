package com.helper;
//
import com.oblador.vectoricons.VectorIconsPackage;

import com.reactnativenavigation.NavigationApplication;

import com.imagepicker.ImagePickerPackage;

import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
//
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.helper.DetectHardware.DetectHardwarePackage;
import com.helper.DetectHardware.DetectDisplay;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
      // Make sure you are using BuildConfig from your own application
      return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
      // Add additional packages you require here
      // No need to add RnnPackage and MainReactPackage
      return Arrays.<ReactPackage>asList(
          new VectorIconsPackage(),
          new ImagePickerPackage(),
          new ExtraDimensionsPackage(),
          new DetectHardwarePackage()
      );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }

  // @Override
  // public String getJSMainModuleName() {
  //     return "index";
  // }
}