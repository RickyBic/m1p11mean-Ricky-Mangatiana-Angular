import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-horaires',
  templateUrl: './horaires.component.html',
  styleUrls: ['./horaires.component.css']
})
export class HorairesComponent {

  currentUser: any;
  horairesTravail: any[] = [];

  constructor(private utilisateurService: UtilisateurService, private scriptLoaderService: ScriptLoaderService) {
    this.currentUser = utilisateurService.getCurrentUser();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
    this.getHorairesTravailUtilisateur();
  }

  getHorairesTravailUtilisateur() {
    if (this.currentUser) {
      const utilisateurConnecte = this.utilisateurService.getCurrentUser();
      if (utilisateurConnecte && utilisateurConnecte.horairestravail) {
        this.horairesTravail = utilisateurConnecte.horairestravail;
      }
    }
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  jourSemaine(jour: number): string {
    switch(jour) {
      case 1: return 'Lundi';
      case 2: return 'Mardi';
      case 3: return 'Mercredi';
      case 4: return 'Jeudi';
      case 5: return 'Vendredi';
      case 6: return 'Samedi';
      case 7: return 'Dimanche';
      default: return '';
    }
  }

}
