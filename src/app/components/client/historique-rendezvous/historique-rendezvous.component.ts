import { Component } from '@angular/core';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';

@Component({
  selector: 'app-historique-rendezvous',
  templateUrl: './historique-rendezvous.component.html',
  styleUrls: ['./historique-rendezvous.component.css']
})
export class HistoriqueRendezvousComponent {
  utilisateurConnecte: any;
  rendezVous : any[] = [];
  constructor(private utilisateurService : UtilisateurServiceService) { }

  ngOnInit(): void {
    this.utilisateurService.user.subscribe(user => {
      this.utilisateurConnecte = user;
    });
    this.utilisateurService.getRendezVousByClient(this.utilisateurConnecte._id).subscribe(data => {
      this.rendezVous = data;
    });
  }
}
