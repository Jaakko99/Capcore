import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capacitor.camera',
  appName: 'capacitor-camera',
  webDir: 'dist',
  server: {
    url: 'http://192.168.137.1:4200',
    cleartext: true
  }
};

export default config;
