import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent {

  baseURL = "http://localhost:5000";
  currentUser: any;
  dateDebut: string = "2024-02-01";
  dateFin: string;
  tempsMoyenDeTravail: any;
  nombreDeReservationJournalier: number = 0;
  nombreDeReservationMensuel: number = 0;
  chiffreAffaireJournalier: number = 0;
  chiffreAffaireMensuel: number = 0;
  beneficeMensuel: number = 0;

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService, private http: HttpClient) {
    this.currentUser = utilisateurService.getCurrentUser();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.dateFin = `${year}-${month}-${day}`;
    this.getStatistiques();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  getStatistiques() {
    this.http.post(this.baseURL + "/statistiques", { "dateDebut": this.dateDebut, "dateFin": this.dateFin })
      .subscribe((resultData: any) => {
        this.tempsMoyenDeTravail = resultData.tempsMoyenDeTravail;
        this.nombreDeReservationJournalier = resultData.nombreDeReservationJournalier;
        this.nombreDeReservationMensuel = resultData.nombreDeReservationMensuel;
        this.chiffreAffaireJournalier = resultData.chiffreAffaireJournalier;
        this.chiffreAffaireMensuel = resultData.chiffreAffaireMensuel;
        this.beneficeMensuel = resultData.beneficeMensuel;
      });
  }

}
