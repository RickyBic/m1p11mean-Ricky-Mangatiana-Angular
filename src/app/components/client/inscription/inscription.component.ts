import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  motDePasse: string = '';
  erreurMessage: string = '';
  successMessage: string = '';

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService, private router: Router) {
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  registerNewClient() {
    this.utilisateurService.registerNewClient(this.nom, this.prenom, this.email, this.motDePasse)
      .subscribe(
        response => {
          console.log('Nouveau client ajouté avec succès!', response);
          this.successMessage = 'Inscription réussie ! Redirection vers la page de connexion...';
          setTimeout(() => {
            this.router.navigate(['/se-connecter']);
          }, 3000);
        },
        error => {
          console.error('Erreur lors de l\'inscription:', error);
          this.erreurMessage = 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.';
        }
      );
  }

}
