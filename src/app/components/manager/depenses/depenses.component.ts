import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Depense } from 'src/app/module/interface/model';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent {

  baseURL = "http://localhost:5000";
  currentUser: any;
  depenses: Depense[] = [];
  nom: String = "";
  montant: Number = 0;

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService, private http: HttpClient) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.getDepenses();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  getDepenses() {
    this.http.get(this.baseURL + "/depenses")
      .subscribe((resultData: any) => {
        this.depenses = resultData;
      });
  }

  ajouter() {
    this.http.post(this.baseURL + "/depense", { "nom": this.nom, "montant": this.montant }).subscribe((resultData: any) => {
      this.getDepenses();
    });
  }

  supprimer(_id: string) {
    this.http.delete(this.baseURL + "/depense/" + _id).subscribe((resultData: any) => {
      this.getDepenses();
    });
  }

}
