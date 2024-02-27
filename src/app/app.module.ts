import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/client/inscription/inscription.component';
import { PriserendezvousComponent } from './components/client/priserendezvous/priserendezvous.component';
import { PersonnelComponent } from './components/manager/personnel/personnel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RendezvousComponent } from './components/employe/rendezvous/rendezvous.component';
import { HistoriqueComponent } from './components/client/historique/historique.component';
import { PreferencesComponent } from './components/client/preferences/preferences.component';
import { NotificationsComponent } from './components/client/notifications/notifications.component';
import { ProfilComponent } from './components/employe/profil/profil.component';
import { HorairesComponent } from './components/employe/horaires/horaires.component';
import { TachesComponent } from './components/employe/taches/taches.component';
import { StatistiquesComponent } from './components/manager/statistiques/statistiques.component';
import { ServicesComponent } from './components/manager/services/services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    PersonnelComponent,
    RendezvousComponent,
    HistoriqueComponent,
    PreferencesComponent,
    PriserendezvousComponent,
    NotificationsComponent,
    ProfilComponent,
    HorairesComponent,
    TachesComponent,
    StatistiquesComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
