import { Component } from '@angular/core';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent {
  rendezVous: any[] = [];
  utilisateurConnecte: any;

  constructor(private utilisateurService : UtilisateurServiceService) { }

  ngOnInit(): void {
    this.utilisateurService.user.subscribe(user => {
      this.utilisateurConnecte = user;
    });
    this.utilisateurService.getRendezVousByEmploye(this.utilisateurConnecte._id).subscribe(data => {
      this.rendezVous = data;
    });
  }
}
