import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';

import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { TeamComponent } from './components/team/team.component';
import { PartnersComponent } from './components/partners/partners.component';
import { GlobeComponent } from './globe/globe.component';
import { NumcountComponent } from './numcount/numcount.component';
import { SvgAnimationsComponent } from './svg-animations/svg-animations.component';
import { TestimonialSliderComponent } from './testimonial-slider/testimonial-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    RoadmapComponent,
    TeamComponent,
    PartnersComponent,
    GlobeComponent,
    NumcountComponent,
    SvgAnimationsComponent,
    TestimonialSliderComponent,
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
