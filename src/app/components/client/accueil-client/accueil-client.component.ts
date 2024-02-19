import { Component } from '@angular/core';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';

@Component({
  selector: 'app-accueil-client',
  templateUrl: './accueil-client.component.html',
  styleUrls: ['./accueil-client.component.css']
})
export class AccueilClientComponent {
  utilisateurConnecte: any;

  constructor(private utilisateurService : UtilisateurServiceService) { }

  ngOnInit(): void {
    this.utilisateurService.user.subscribe(user => {
      this.utilisateurConnecte = user;
    });
  }

  deconnexion(): void {
    this.utilisateurService.deconnexion();
  }
}
