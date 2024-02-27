import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('closeButton') closeButton: ElementRef;

  selectedFile: string | null = null;
  draggedOver = false;

  constructor(private utilisateurService: UtilisateurService, private scriptLoaderService: ScriptLoaderService, private http: HttpClient) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.readService();
    this.closeButton = {} as ElementRef;
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }
  
   closeModal() {
    // Close the modal
    this.closeButton.nativeElement.click();
  }
  
  createService() {
    this.commission /= 100; // 0.0 [MongoDB]
    if (this.serviceID == '') {
      let bodyData = {
        "nom": this.nom,
        "prix": this.prix,
        "duree": this.duree,
        "commission": this.commission
      };
      this.http.post(this.baseURL + "/service", bodyData).subscribe((resultData: any) => {
         this.readService();
      });
    } else {
      this.updateService();
    }
    this.closeModal();
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
       

  readService() {
    this.http.get(this.baseURL + "/services")
      .subscribe((resultData: any) => {
        this.services = resultData;
      });
  }

  setUpdateService(data: any) {
    this.serviceID = data._id;
    this.nom = data.nom;
    this.prix = data.prix;
    this.duree = data.duree;
    this.commission = data.commission * 100;
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
      this.readService();
    });
  }

  deleteService(data: any) {
    this.http.delete(this.baseURL + "/services/" + data._id).subscribe((resultData: any) => {
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
