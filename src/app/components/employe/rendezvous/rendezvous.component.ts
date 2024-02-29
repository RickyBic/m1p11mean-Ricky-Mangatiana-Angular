import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent {
  currentUser: any;
  rendezVous: any[] = [];
  utilisateurConnecte: any;

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService) {
    this.currentUser = utilisateurService.getCurrentUser();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
    this.utilisateurService.user.subscribe(user => {
      this.utilisateurConnecte = user;
    });
    this.getRendezVousByEmploye();
  }

  getRendezVousByEmploye() {
    this.utilisateurService.getRendezVousByEmploye(this.utilisateurConnecte._id).subscribe(data => {
      this.rendezVous = data;
    });
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  effectuerRendezVous(rendezVousId: string) {
    this.utilisateurService.mettreAJourEtatRendezVous(rendezVousId).subscribe(
      (data) => {
        console.log('État du rendez-vous mis à jour avec succès', data);
        this.getRendezVousByEmploye();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'état du rendez-vous', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    let hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    hour = ('0' + (parseInt(hour, 10) - 3)).slice(-2); // Ajuster l'heure en fonction du décalage horaire (-3)
    return `${day}/${month}/${year} ${hour}:${minutes}`;
  }

}
