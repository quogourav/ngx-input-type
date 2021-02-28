import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxInputTypeModule } from 'projects/ngx-input-type/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxInputTypeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
