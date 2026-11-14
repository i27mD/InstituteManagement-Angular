import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // استدعاء App

bootstrapApplication(App, appConfig) // استخدام App هنا
  .catch((err) => console.error(err));