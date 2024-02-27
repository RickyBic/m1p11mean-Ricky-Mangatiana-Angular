import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/client/inscription/inscription.component';
import { PriserendezvousComponent } from './components/client/priserendezvous/priserendezvous.component';
import { HistoriqueComponent } from './components/client/historique/historique.component';
import { PreferencesComponent } from './components/client/preferences/preferences.component';
import { NotificationsComponent } from './components/client/notifications/notifications.component';
import { RendezvousComponent } from './components/employe/rendezvous/rendezvous.component';
import { ProfilComponent } from './components/employe/profil/profil.component';
import { HorairesComponent } from './components/employe/horaires/horaires.component';
import { TachesComponent } from './components/employe/taches/taches.component';
import { PersonnelComponent } from './components/manager/personnel/personnel.component';
import { StatistiquesComponent } from './components/manager/statistiques/statistiques.component';
import { ServicesComponent } from './components/manager/services/services.component';
import { DepensesComponent } from './components/manager/depenses/depenses.component';

const routes: Routes = [
  /*----------[LOGIN]----------*/
  { path: 'se-connecter', component: LoginComponent },
  /*----------[CLIENT]----------*/
  { path: 'inscription', component: InscriptionComponent },
  { path: 'prise-rendez-vous', component: PriserendezvousComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'notifications', component: NotificationsComponent },
  /*----------[EMPLOYE]----------*/
  { path: 'rendez-vous', component: RendezvousComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'horaires', component: HorairesComponent },
  { path: 'taches', component: TachesComponent },
  /*----------[MANAGER]----------*/
  { path: 'personnel', component: PersonnelComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'depenses', component: DepensesComponent },
  { path: 'statistiques', component: StatistiquesComponent },
  /*----------[INDEX]----------*/
  { path: '', redirectTo: 'se-connecter', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
