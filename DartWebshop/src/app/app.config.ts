import {provideRouter} from "@angular/router";
import {ApplicationConfig} from "@angular/core";
import {routes} from './app.routing.module'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
