import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent {
  currentUser: any;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  motDePasse: string = '';
  successMessage: string = '';

  listeEmploye: any[] = [];

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.utilisateurService.employeSubject.subscribe((data) => {
      this.listeEmploye = data;
    });
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
    this.getAllEmploye();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  ajouterEmploye() {
    this.utilisateurService.ajouterEmploye(this.nom, this.prenom, this.email, this.motDePasse);
  }

  getAllEmploye(): void {
    this.utilisateurService.getAllEmploye().subscribe((data) => {
      this.listeEmploye = data;
    });
  }
}
