import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service, Utilisateur } from 'src/app/modules/interface/model';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-priserendezvous',
  templateUrl: './priserendezvous.component.html',
  styleUrls: ['./priserendezvous.component.css']
})
export class PriserendezvousComponent {

  baseURL = "http://localhost:5000";
  currentUser: any;
  services: Service[] = [];
  employes: Utilisateur[] = [];
  step: number = 0; // [0] Séléction service >> [1] Séléction date et heure >> [2] Paiement
  dateHeure: string = "";
  selectedServices: Service[] = [];
  serviceToAddId: string = "";
  employeToAddId: string = "";
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string = "";
  totalPaiement: number = 0;
  numeroMvola: string = "";
  numeroOrange: string = "";
  numeroAirtel: string = "";
  numeroVisa: string = "";

  constructor(private utilisateurService: UtilisateurService, private scriptLoaderService: ScriptLoaderService, private http: HttpClient, private router: Router) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.getServices();
    this.getEmployes();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  getServices() {
    this.http.get<Service[]>(this.baseURL + "/services")
      .subscribe((resultData) => {
        this.services = resultData;
      });
  }

  getEmployes() {
    this.http.get<Utilisateur[]>(this.baseURL + "/listeEmploye")
      .subscribe((resultData) => {
        this.employes = resultData;
      });
  }

  getEmployesByServiceId(_id: string) {
    return this.employes.filter(employe =>
      employe.services.some(service => service === _id)
    );
  }

  getServiceById(_id: string) {
    return this.services.find(service => service._id === _id) ?? null;
  }

  prendreRdv(service: Service) {
    this.step = 1;
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 3); // UTC+3 Madagascar
    currentDate.setMinutes(currentDate.getMinutes() + 60);
    this.dateHeure = currentDate.toISOString().slice(0, 16);
    service.employe_id = this.getEmployesByServiceId(service._id)[0]._id;
    this.selectedServices.push(service);
    this.serviceToAddId = this.services[0]._id;
    this.onServiceToAddIdChange();
  }

  onServiceToAddIdChange() {
    this.employeToAddId = this.getEmployesByServiceId(this.serviceToAddId)[0]._id;
  }

  supprimer(serviceToRemove: Service) {
    this.selectedServices = this.selectedServices.filter(service => service !== serviceToRemove);
  }

  ajouter() {
    const serviceToAdd: Service | null = this.getServiceById(this.serviceToAddId);
    if (serviceToAdd !== null) {
      if (this.selectedServices.find(service => service._id === serviceToAdd._id)) {
        alert("Ce service a déjà été ajouté");
      } else {
        serviceToAdd.employe_id = this.employeToAddId;
        this.selectedServices.push(serviceToAdd);
      }
    }
  }

  reserver() {
    if (this.selectedServices.length > 0) {
      let bodyData = {
        "services": this.selectedServices,
        "dateHeure": this.dateHeure
      };
      this.loading = true;
      this.http.post(this.baseURL + "/reservation", bodyData).subscribe(
        (resultData: any) => {
          // Simulate a 4-second delay
          setTimeout(() => {
            this.loading = false;
            if (resultData.status === false) {
              this.error = true;
              this.errorMessage = resultData.message + " pour le service " + resultData.service.toLowerCase();
              setTimeout(() => {
                this.error = false; // Hide error message
              }, 20000);
            } else {
              this.totalPaiement = this.selectedServices.reduce((total, service) => total + service.prix, 0);
              this.step = 2;
            }
          }, 4000);
        },
        (error) => {
          this.loading = false;
          console.error('Error occurred:', error);
        }
      );
    } else {
      alert("Aucun service n'a été séléctionné");
    }
  }

  annuler() {
    this.selectedServices = [];
    this.step = 0;
  }

  retour() {
    this.step = 1;
  }

  payer(modedepaiement: string) {
    if (modedepaiement !== '') {
      let bodyData = {
        "client": this.currentUser._id,
        "services": this.selectedServices,
        "dateHeure": this.dateHeure
      };
      this.http.post(this.baseURL + "/paiement", bodyData).subscribe(
        (resultData: any) => {
          this.router.navigate(['/historique'], {
            queryParams: {
              notificationMessage: resultData.message
            }
          });
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
    } else {
      alert("Veuillez complétez le champ");
    }
  }

}
