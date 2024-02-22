import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Utilisateur } from '../modules/interface/model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private baseUrl = 'http://localhost:5000';

  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user: Observable<any> = this.userSubject.asObservable();

  employeSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  employes: Observable<any[]> = this.employeSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, motDePasse: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, motDePasse })
      .pipe(
        tap(user => {
          this.userSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  getCurrentUser(): Utilisateur | null {
    const storedUser = localStorage.getItem('currentUser');
    // Check if the item exists
    if (storedUser) {
      // Parse the JSON string
      const parsedUser = JSON.parse(storedUser);
      // Cast the parsed object to UserInterface
      return parsedUser as Utilisateur;
    }
    return null;
  }

  registerNewClient(nom: string, prenom: string, email: string, motDePasse: string): Observable<any> {
    const newClient = {
      nom,
      prenom,
      email,
      motDePasse,
      profil: 2
    };
    return this.http.post<any>(`${this.baseUrl}/nouveauClient`, newClient);
  }

  ajouterEmploye(nom: string, prenom: string, email: string, motDePasse: string): void {
    const newEmp = {
      nom,
      prenom,
      email,
      motDePasse,
      profil: 1
    };
    this.http.post<any>(`${this.baseUrl}/nouveauEmploye`, newEmp).subscribe((response) => {
      console.log('Employé ajouté avec succès', response);
      this.getAllEmploye();
    },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'employé', error);
      });
  }

  getAllEmploye(): Observable<any> {
    const observable = this.http.get<any[]>(`${this.baseUrl}/listeEmploye`);
    observable.subscribe((employes) => {
      this.employeSubject.next(employes);
    });
    return observable;
  }

  deconnexion(): void {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  getRendezVousByEmploye(employeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rendezvous/employe/${employeId}`);
  }

  getRendezVousByClient(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rendezvous/client/${clientId}`);
  }

  updateHoraireTravail(userId: string, horaireId: string, nouvelHoraire: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/utilisateur/${userId}/horairetravail/${horaireId}`, nouvelHoraire);
  }
}
