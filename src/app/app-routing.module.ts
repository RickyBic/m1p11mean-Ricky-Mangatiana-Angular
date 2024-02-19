import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './components/manager/service/service.component';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/client/inscription/inscription.component';
import { AccueilManagerComponent } from './components/manager/accueil-manager/accueil-manager.component';
import { AccueilEmployeComponent } from './components/employe/accueil-employe/accueil-employe.component';
import { AccueilClientComponent } from './components/client/accueil-client/accueil-client.component';
import { PriserendezvousComponent } from './components/client/priserendezvous/priserendezvous.component';

const routes: Routes = [
  { path: 'services', component: ServiceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'manager', component: AccueilManagerComponent },
  { path: 'employe', component: AccueilEmployeComponent },
  { path: 'client', component: AccueilClientComponent },
  { path: 'prise-rendez-vous', component: PriserendezvousComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
