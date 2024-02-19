import { Component } from '@angular/core';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  motDePasse: string = '';
  successMessage: string = '';

  listeEmploye : any[] = [];

  constructor(private utilisateurService : UtilisateurServiceService) {
    this.utilisateurService.employeSubject.subscribe((data)=>{
      this.listeEmploye = data;
    });
  }

  ngOnInit(): void {
    this.getAllEmploye();
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
