import {HttpClientModule, provideHttpClient, withInterceptors, withJsonpSupport} from '@angular/common/http';
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from "@angular/router";
import routerConfig from "./routes";
import {httpInterceptorProviders} from "../../services/http.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withJsonpSupport()),
    provideRouter(routerConfig),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders
  ]
};
