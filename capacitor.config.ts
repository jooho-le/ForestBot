import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kr.forestbot.app',
  appName: 'ForestBot',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
