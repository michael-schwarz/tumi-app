import { AnalyticsCommand } from '@angular/cli/commands/analytics-impl';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN, FUNCTIONS_REGION } from '@angular/fire/functions';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import localeEn from '@angular/common/locales/en-DE';
import localeEnExtra from '@angular/common/locales/extra/en-DE';
import { AnalyticsErrorHandler } from './AnalyticsErrorHandler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailSigninComponent } from './components/mail-signin/mail-signin.component';
import { ScanRequestComponent } from './components/scan-request/scan-request.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeEn, 'en-DE', localeEnExtra);

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent, ScanRequestComponent, MailSigninComponent],
  entryComponents: [ScanRequestComponent, MailSigninComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirePerformanceModule,
    SharedModule,
    PagesModule,
    AppRoutingModule
  ],
  providers: [
    { provide: FUNCTIONS_ORIGIN, useValue: environment.functionsOrigin },
    { provide: FUNCTIONS_REGION, useValue: 'europe-west1' },
    { provide: LOCALE_ID, useValue: 'en-DE' },
    environment.production ? { provide: ErrorHandler, useClass: AnalyticsErrorHandler } : [],
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
