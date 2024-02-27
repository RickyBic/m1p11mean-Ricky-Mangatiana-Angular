import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  messageSuccess: string = '';

  nom: string = '';
  prenom: string = '';
  email: string = '';
  motDePasse: string = '';

  currentUser: any;

  constructor(private utilisateurService: UtilisateurService, private scriptLoaderService: ScriptLoaderService) {
    this.currentUser = utilisateurService.getCurrentUser();

  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  mettreAJourProfil() {
    this.utilisateurService.modifierUtilisateur(this.currentUser._id, this.nom, this.prenom, this.email, this.motDePasse).subscribe(
      response => {
        console.log("Profil mis à jour avec succès", response);
        this.messageSuccess = 'Profil mis à jour avec succès';
        setTimeout(() => {
          this.messageSuccess = '';
        }, 10000);
        this.utilisateurService.login(this.currentUser.email, this.currentUser.motDePasse).subscribe(
          response => {
            this.currentUser = this.utilisateurService.getCurrentUser();
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.error("Erreur lors de la mise à jour du profil", error);
      }
    );
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

}
