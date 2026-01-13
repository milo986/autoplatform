import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { provideServerRendering } from '@angular/platform-server';

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(App, {
    ...config,
    providers: [
      provideServerRendering(),
      ...(config.providers || []),
    ],
  }, context); 
}
