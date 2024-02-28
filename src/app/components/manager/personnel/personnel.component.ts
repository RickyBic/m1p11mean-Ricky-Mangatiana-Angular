import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScriptLoaderService } from 'src/app/service/scriptloader.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent {
  currentUser: any;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  motDePasse: string = '';
  successMessage: string = '';

  listeEmploye: any[] = [];
  listeService: any[] = [];

  selectedServices: string[] = [];

  employeSelectionne: any;

  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(private scriptLoaderService: ScriptLoaderService, private utilisateurService: UtilisateurService) {
    this.currentUser = utilisateurService.getCurrentUser();
    this.closeButton = {} as ElementRef;
    this.utilisateurService.employeSubject.subscribe((data) => {
      this.listeEmploye = data;
    });
  }

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts();
    this.getAllEmploye();
    this.getAllServices();
  }

  deconnexion() {
    this.utilisateurService.deconnexion();
  }

  ajouterEmploye() {
    if (this.employeSelectionne !== null) {
      this.utilisateurService.modifierUtilisateurEtService(this.employeSelectionne._id, this.nom, this.prenom, this.email, this.motDePasse, this.selectedServices).subscribe(() => {
        this.closeModal();
        this.getAllEmploye();
        this.reset();
        this.employeSelectionne = null;
      }, (error) => {
        console.error('Erreur lors de la modification de l\'employé', error);
        this.successMessage = 'Une erreur s\'est produite lors de la modification de l\'employé';
      });
    } else {
      this.utilisateurService.ajouterEmploye(this.nom, this.prenom, this.email, this.motDePasse, this.selectedServices).subscribe(() => {
        this.closeModal();
        this.getAllEmploye();
        this.reset();
      }, (error) => {
        console.error('Erreur lors de l\'ajout de l\'employé', error);
        this.successMessage = 'Une erreur s\'est produite lors de l\'ajout de l\'employé';
      });
    }
  }

  selectionnerEmploye(employe: any) {
    this.employeSelectionne = employe;
    this.nom = employe.nom;
    this.prenom = employe.prenom;
    this.email = employe.email;
    this.motDePasse = employe.motDePasse;
    this.selectedServices = [];
    employe.services.forEach((serviceId: string) => {
      const service = this.listeService.find(s => s._id === serviceId);
      if (service) {
        this.selectedServices.push(service._id);
      }
    });
  }

  getAllEmploye(): void {
    this.utilisateurService.getAllEmploye().subscribe((data) => {
      this.listeEmploye = data;
    });
  }

  getAllServices(): void {
    this.utilisateurService.getAllService().subscribe((data) => {
      this.listeService = data;
    });
  }

  reset() {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.motDePasse = '';
    this.selectedServices = [];
    this.employeSelectionne = null;
    this.successMessage = '';
  }

  closeModal() {
    // Close the modal
    this.closeButton.nativeElement.click();
  }

}
