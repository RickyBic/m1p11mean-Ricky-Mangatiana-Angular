import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  motDePasse: string = '';

  erreurMessage: string = '';

  constructor(private utilisateurService : UtilisateurServiceService, private router : Router) {
  }

  onSubmit() {
    this.utilisateurService.login(this.email, this.motDePasse).subscribe(
      response => {
        console.log(response);
        if(response.profil === 0 ) {
          this.router.navigate(['/manager']);
        }
        else if(response.profil === 1) {
          this.router.navigate(['/employe']);
        }
        else {
          this.router.navigate(['/client']);
        }
      },
      error => {
        console.log('error login');
        this.erreurMessage = 'Veuillez reessayer';
      }
    );
  }
}
