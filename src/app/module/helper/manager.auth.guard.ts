import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Injectable({
    providedIn: 'root'
})
export class ManagerAuthGuard implements CanActivate {

    constructor(private router: Router, private utilisateurService: UtilisateurService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.utilisateurService.getCurrentUser() !== null && this.utilisateurService.getCurrentUser()?.profil == 0) {
            return true;
        }
        return this.router.navigate(['/']);
    }

}