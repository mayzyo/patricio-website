import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MockDataProvider } from './core/mock-data.interceptor';
import { MockModelProvider } from './core/mock-model.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    OverlayModule
  ],
  providers: [MockDataProvider, MockModelProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
