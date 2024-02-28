import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Service, Utilisateur } from 'src/app/module/interface/model';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {

  baseURL = "http://localhost:5000";
  currentUser: any;
  services: Service[] = [];
  employes: Utilisateur[] = [];
  serviceToAddId: string = "";
  employeToAddId: string = "";

  constructor(private utilisateurService: UtilisateurService, private scriptLoaderService: ScriptLoaderService, private http: HttpClient) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.getServicesAndEmployes();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  getServicesAndEmployes() {
    this.http.get<Service[]>(this.baseURL + "/services")
      .subscribe((services) => {
        this.http.get<Utilisateur[]>(this.baseURL + "/listeEmploye")
          .subscribe((employes) => {
            this.services = services;
            this.employes = employes;
            this.serviceToAddId = this.services[0]._id;
            this.onServiceToAddIdChange();
          });
      });
  }

  getEmployesByServiceId(_id: string) {
    return this.employes.filter(employe =>
      employe.services.some(service => service === _id)
    );
  }

  onServiceToAddIdChange() {
    this.employeToAddId = this.getEmployesByServiceId(this.serviceToAddId)[0]._id;
  }

  ajouter() {
    for (const preference of this.currentUser.preferences) {
      if (preference.servicePrefere._id === this.serviceToAddId) {
        alert('Ce service possède déjà un employé préféré');
        return;
      }
    }
    const preference = {
      servicePrefere: this.serviceToAddId,
      employePrefere: this.employeToAddId
    };
    this.currentUser.preferences.push(preference);
    this.updateUser();
  }

  supprimer(toRemove: any) {
    const preferences = [];
    for (let preference of this.currentUser.preferences) {
      if (preference.servicePrefere._id !== toRemove.servicePrefere._id) {
        preferences.push(preference);
      }
    }
    this.currentUser.preferences = preferences;
    this.updateUser();
  }

  updateUser() {
    this.http.put(this.baseURL + "/preferences/" + this.currentUser._id, this.currentUser).subscribe((resultData: any) => {
      this.utilisateurService.login(this.currentUser.email, this.currentUser.motDePasse).subscribe(
        response => {
          this.currentUser = this.utilisateurService.getCurrentUser();
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
