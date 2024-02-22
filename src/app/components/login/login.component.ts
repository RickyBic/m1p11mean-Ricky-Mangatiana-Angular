import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  motDePasse: string = '';

  erreurMessage: string = '';

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService, private router: Router) {
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  onSubmit() {
    this.utilisateurService.login(this.email, this.motDePasse).subscribe(
      response => {
        if (response.profil === 0) {
          this.router.navigate(['/personnel']);
        }
        else if (response.profil === 1) {
          this.router.navigate(['/rendez-vous']);
        }
        else {
          this.router.navigate(['/prise-rendez-vous']);
        }
      },
      error => {
        console.log('error login');
        this.erreurMessage = 'Veuillez reessayer';
      }
    );
  }
}
