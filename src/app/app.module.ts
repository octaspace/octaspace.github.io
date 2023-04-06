import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';

import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

@NgModule({
  declarations: [
    AppComponent,
    RoadmapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    NgxGoogleAnalyticsModule.forRoot('G-L4QY0PV54P')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
