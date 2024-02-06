import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './components/manager/service/service.component';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/client/inscription/inscription.component';

const routes: Routes = [
  { path: 'services', component: ServiceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
