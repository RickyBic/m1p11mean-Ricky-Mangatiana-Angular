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
    this.utilisateurService.getRendezVousByEmploye(this.utilisateurConnecte._id).subscribe(data => {
      this.rendezVous = data;
    });
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

}
