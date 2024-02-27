import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {

  baseURL = "http://localhost:5000";
  currentUser: any;
  services: any[] = [];
  serviceID = ""; // ID de l'élément dans le formulaire
  nom: string = "";
  prix: number = 0;
  duree: number = 0;
  commission: number = 0;

  selectedFile: string | null = null;
  draggedOver = false;

  constructor(private utilisateurService: UtilisateurService, private scriptLoaderService: ScriptLoaderService, private http: HttpClient) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.readService();
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.displayImage(file);
  }

  displayImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.draggedOver = false;
    const file = event!.dataTransfer!.files[0];
    this.displayImage(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.draggedOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.draggedOver = false;
  }

  createService() {
    if (this.serviceID === '') {
      const serviceData = {
        nom: this.nom,
        prix: this.prix,
        duree: this.duree,
        commission: this.commission / 100,
        image: this.selectedFile
      };
      this.http.post(this.baseURL + "/service", serviceData).subscribe((resultData: any) => {
        console.log(resultData);
        alert(resultData.message);
        this.nom = "";
        this.prix = 0;
        this.duree = 0;
        this.commission = 0;
        this.selectedFile = null;
        this.readService();
      });
    } else {
      this.updateService();
    }
  }

  readService() {
    this.http.get(this.baseURL + "/services").subscribe((resultData: any) => {
        this.services = resultData;
      });
  }

  setUpdateService(data: any) {
    this.serviceID = data._id;
    this.nom = data.nom;
    this.prix = data.prix;
    this.duree = data.duree;
    this.commission = data.commission;
    this.selectedFile = data.image
  }

  updateService() {
    let bodyData = {
      "nom": this.nom,
      "prix": this.prix,
      "duree": this.duree,
      "commission": this.commission,
      "image": this.selectedFile
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

  resetForm(): void {
    this.serviceID = '';
    this.nom = '';
    this.prix = 0;
    this.duree = 0;
    this.commission = 0;
    this.selectedFile = null;
  }

}
