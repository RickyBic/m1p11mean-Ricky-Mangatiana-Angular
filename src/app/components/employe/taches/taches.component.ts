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

  baseURL = "";
  currentUser: any;
  taches: any; // Tâches effectuées [rendezvous]
  commission: number = 0;
  pourcentage: number = 0;

  constructor(private utilisateurService: UtilisateurService, private scriptLoaderService: ScriptLoaderService, private http: HttpClient) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.baseURL = utilisateurService.getbaseUrl();
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    let hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    hour = ('0' + (parseInt(hour, 10) - 3)).slice(-2); // Ajuster l'heure en fonction du décalage horaire (-3)
    return `${day}/${month}/${year} ${hour}:${minutes}`;
  }

}
