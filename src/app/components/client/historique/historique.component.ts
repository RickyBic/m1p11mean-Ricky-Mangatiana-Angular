import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {
  currentUser: any;
  rendezVous: any[] = [];
  notificationMessage: string = "";
  notificationDisplay: boolean = false;

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService, private route: ActivatedRoute) {
    this.currentUser = utilisateurService.getCurrentUser();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
    this.currentUser = this.utilisateurService.getCurrentUser();
    this.utilisateurService.getRendezVousByClient(this.currentUser._id).subscribe(data => {
      this.rendezVous = data;
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (this.route.snapshot.queryParams['notificationMessage']) {
        this.notificationMessage = queryParams['notificationMessage'];
        this.showNotification();
      }
    });
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  showNotification() {
    if (this.notificationMessage) {
      this.notificationDisplay = true;
      // Automatically hide the notification after 8 seconds
      setTimeout(() => {
        this.notificationDisplay = false;
        this.notificationMessage = '';
      }, 8000); // 8 seconds
    }
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
