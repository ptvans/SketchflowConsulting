import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pivot.careerexploration',
  appName: 'Pivot',
  webDir: 'dist/public',
  bundledWebRuntime: false,
  server: {
    // Remove this block for production builds
    // url: 'http://localhost:5000',
    // cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#080810',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#080810',
      overlaysWebView: true,
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true,
    },
  },
  ios: {
    contentInset: 'always',
    scrollEnabled: true,
    backgroundColor: '#080810',
  },
  android: {
    backgroundColor: '#080810',
  },
};

export default config;
