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
import { PersonnelComponent } from './components/manager/personnel/personnel.component';
import { AccueilEmployeComponent } from './components/employe/accueil-employe/accueil-employe.component';
import { AccueilClientComponent } from './components/client/accueil-client/accueil-client.component';
import { AccueilManagerComponent } from './components/manager/accueil-manager/accueil-manager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RendezvousComponent } from './components/employe/rendezvous/rendezvous.component';
import { HistoriqueRendezvousComponent } from './components/client/historique-rendezvous/historique-rendezvous.component';
import { PreferencesComponent } from './components/client/preferences/preferences.component';
import { ProfilEmployeComponent } from './components/employe/profil-employe/profil-employe.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    LoginComponent,
    InscriptionComponent,
    PersonnelComponent,
    AccueilEmployeComponent,
    AccueilClientComponent,
    AccueilManagerComponent,
    RendezvousComponent,
    HistoriqueRendezvousComponent,
    PreferencesComponent,
    ProfilEmployeComponent,
    PriserendezvousComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
