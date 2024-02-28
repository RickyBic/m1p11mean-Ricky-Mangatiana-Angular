import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-horaires',
  templateUrl: './horaires.component.html',
  styleUrls: ['./horaires.component.css']
})
export class HorairesComponent {
  jourSemaineRemplacement : number = 0;
  currentUser: any;
  horairesTravail: any[] = [];
  horairesTravailCorrespondant: any[] = [];
  horaireAchanger: any;

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
        this.horairesTravail.sort((a, b) => a.jourSemaine - b.jourSemaine);
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

  remplacerHoraire(jourSemaine: number,horaire: any) {
    this.jourSemaineRemplacement = jourSemaine;
    this.chargerHorairesTravail(jourSemaine);
    this.horaireAchanger=horaire;
  }

  chargerHorairesTravail(jourSemaine: number): void {
    this.utilisateurService.getHorairesTravail(jourSemaine).subscribe(
        (data) => {
          this.horairesTravailCorrespondant = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des horaires de travail :', error);
        }
      );
  }

  choisirHoraire(horaire: any) {
    this.utilisateurService.supprimerHoraireTravail(this.currentUser._id, this.horaireAchanger).subscribe(
      response => {
        console.log(response);
        this.utilisateurService.ajouterHoraireTravail(this.currentUser._id, horaire).subscribe(
          response => {
            console.log(response);
            this.utilisateurService.login(this.currentUser.email, this.currentUser.motDePasse).subscribe(
                  response => {
                    this.currentUser = this.utilisateurService.getCurrentUser();
                    this.getHorairesTravailUtilisateur();
                    this.horaireAchanger=null;
                  },
                  error => {
                    console.log(error);
                  });
          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
  }
}
