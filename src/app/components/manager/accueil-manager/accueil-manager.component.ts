import { Component } from '@angular/core';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';

@Component({
  selector: 'app-accueil-manager',
  templateUrl: './accueil-manager.component.html',
  styleUrls: ['./accueil-manager.component.css']
})
export class AccueilManagerComponent {
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
