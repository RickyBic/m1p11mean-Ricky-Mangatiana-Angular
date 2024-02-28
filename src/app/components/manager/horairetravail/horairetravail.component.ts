import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Horairetravail } from 'src/app/module/interface/model';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-horairetravail',
  templateUrl: './horairetravail.component.html',
  styleUrl: './horairetravail.component.css'
})
export class HorairetravailComponent {

  baseURL = "http://localhost:5000";
  currentUser: any;
  horaires: Horairetravail[] = [];
  heureDebut: String = "09:00";
  heureFin: String = "17:00";
  jourSemaine: Number = 0;

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService, private http: HttpClient) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.getHoraires();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  getHoraires() {
    this.http.get(this.baseURL + "/horaires")
      .subscribe((resultData: any) => {
        this.horaires = resultData;
      });
  }

  ajouter() {
    const [hourDebutStr, minuteDebutStr] = this.heureDebut.split(":");
    const hourDebut = parseInt(hourDebutStr, 10);
    const minutesDebut = parseInt(minuteDebutStr, 10);
    const [hourFinStr, minuteFinStr] = this.heureFin.split(":");
    const hourFin = parseInt(hourFinStr, 10);
    const minutesFin = parseInt(minuteFinStr, 10);
    this.http.post(this.baseURL + "/horaire", { "heureDebut": hourDebut + (minutesDebut / 60), "heureFin": hourFin + (minutesFin / 60), "jourSemaine": this.jourSemaine }).subscribe((resultData: any) => {
      this.getHoraires();
    });
  }

  supprimer(_id: string) {
    this.http.delete(this.baseURL + "/horaire/" + _id).subscribe((resultData: any) => {
      this.getHoraires();
    });
  }

  getNomJour(jour: number): string {
    switch (jour) {
      case 1: return 'Lundi';
      case 2: return 'Mardi';
      case 3: return 'Mercredi';
      case 4: return 'Jeudi';
      case 5: return 'Vendredi';
      case 6: return 'Samedi';
      case 0: return 'Dimanche';
      default: return '';
    }
  }

  decimalHoursToTimeString(decimalHours: number): string {
    const hours = Math.floor(decimalHours);
    const decimalPart = decimalHours - hours;
    const minutes = Math.round(decimalPart * 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

}
