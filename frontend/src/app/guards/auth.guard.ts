import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.authService.getToken();
      const user = this.authService.getUser();
      const rol = user?.rol?.rol;

      if (token) {
        // ✅ Solo Asesores pueden acceder al módulo advisers
        if (rol === 'Asesor') {
          return true;
        } else {
          return this.router.parseUrl('/login');
        }
      } else {
        // ✅ No autenticado → redirigir al login
        return this.router.parseUrl('/login');
      }
    }

    return this.router.parseUrl('/login');
  }
}
