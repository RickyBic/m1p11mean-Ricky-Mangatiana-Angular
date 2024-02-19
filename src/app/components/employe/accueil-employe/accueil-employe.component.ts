import { Component } from '@angular/core';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';

@Component({
  selector: 'app-accueil-employe',
  templateUrl: './accueil-employe.component.html',
  styleUrls: ['./accueil-employe.component.css']
})
export class AccueilEmployeComponent {
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
