import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  baseURL = "http://localhost:5000";
  services: any[] = [];
  serviceID = ""; // ID de l'élément dans le formulaire
  nom: string = "";
  prix: number = 0;
  duree: number = 0;
  commission: number = 0;

  constructor(private http: HttpClient) {
    this.readService();
  }

  createService() {
    if (this.serviceID == '') {
      let bodyData = {
        "nom": this.nom,
        "prix": this.prix,
        "duree": this.duree,
        "commssion": this.commission
      };
      this.http.post(this.baseURL + "/service", bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert(resultData.message);
        this.nom = "";
        this.prix = 0;
        this.duree = 0;
        this.commission = 0;
        this.readService();
      });
    }
    else {
      this.updateService();
    }
  }

  readService() {
    this.http.get(this.baseURL + "/services")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.services = resultData;
      });
  }

  setUpdateService(data: any) {
    this.serviceID = data._id;
    this.nom = data.nom;
    this.prix = data.prix;
    this.duree = data.duree;
    this.commission = data.commission;
  }

  updateService() {
    let bodyData = {
      "nom": this.nom,
      "prix": this.prix,
      "duree": this.duree,
      "commission": this.commission,
    };
    this.http.put(this.baseURL + "/services/" + this.serviceID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert(resultData.message);
      this.readService();
    });
  }

  deleteService(data: any) {
    this.http.delete(this.baseURL + "/services/" + data._id).subscribe((resultData: any) => {
      console.log(resultData);
      alert(resultData.message);
      this.readService();
    });
  }

}
