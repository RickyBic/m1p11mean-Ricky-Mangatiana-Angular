import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceComponent } from './components/manager/service/service.component';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/client/inscription/inscription.component';
import { PriserendezvousComponent } from './components/client/priserendezvous/priserendezvous.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    LoginComponent,
    InscriptionComponent,
    PriserendezvousComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
