import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent {

  baseURL = "http://localhost:5000";
  currentUser: any;
  taches: any; // Tâches effectuées [rendezvous]
  commission: number = 0;
  pourcentage: number = 0;

  constructor(private utilisateurService: UtilisateurService, private scriptLoaderService: ScriptLoaderService, private http: HttpClient) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.getTaches();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  getTaches() {
    this.http.get(this.baseURL + "/taches/" + this.currentUser._id).subscribe(
      (resultData: any) => {
        this.taches = resultData.taches;
        this.commission = resultData.commission;
        this.pourcentage = resultData.pourcentage;
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

}
