import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gerenciamento.financeiro',
  appName: 'Gerenciamento Financeiro',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config; 