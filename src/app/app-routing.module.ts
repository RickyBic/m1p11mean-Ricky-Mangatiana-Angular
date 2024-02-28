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
import { HorairetravailComponent } from './components/manager/horairetravail/horairetravail.component';
import { ClientAuthGuard } from './module/helper/client.auth.guard';
import { EmployeAuthGuard } from './module/helper/employe.auth.guard';
import { ManagerAuthGuard } from './module/helper/manager.auth.guard';

const routes: Routes = [
  /*----------[LOGIN]----------*/
  { path: 'se-connecter', component: LoginComponent },
  /*----------[CLIENT]----------*/
  { path: 'inscription', component: InscriptionComponent },
  { path: 'prise-rendez-vous', component: PriserendezvousComponent, canActivate: [ClientAuthGuard] },
  { path: 'historique', component: HistoriqueComponent, canActivate: [ClientAuthGuard] },
  { path: 'preferences', component: PreferencesComponent, canActivate: [ClientAuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [ClientAuthGuard] },
  /*----------[EMPLOYE]----------*/
  { path: 'rendez-vous', component: RendezvousComponent, canActivate: [EmployeAuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [EmployeAuthGuard] },
  { path: 'horaires', component: HorairesComponent, canActivate: [EmployeAuthGuard] },
  { path: 'taches', component: TachesComponent, canActivate: [EmployeAuthGuard] },
  /*----------[MANAGER]----------*/
  { path: 'personnel', component: PersonnelComponent, canActivate: [ManagerAuthGuard] },
  { path: 'services', component: ServicesComponent, canActivate: [ManagerAuthGuard] },
  { path: 'horairetravail', component: HorairetravailComponent, canActivate: [ManagerAuthGuard] },
  { path: 'depenses', component: DepensesComponent, canActivate: [ManagerAuthGuard] },
  { path: 'statistiques', component: StatistiquesComponent, canActivate: [ManagerAuthGuard] },
  /*----------[INDEX]----------*/
  { path: '', redirectTo: 'se-connecter', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
