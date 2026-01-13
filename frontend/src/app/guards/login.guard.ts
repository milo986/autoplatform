import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.authService.getToken();
      const user = this.authService.getUser();
      const rol = user?.rol?.rol;

      // ✅ Si está logueado, redirigir según el rol
      if (token) {
        if (rol === 'Asesor') {
          return this.router.parseUrl('/advisers/call-center');
        } else {
          return this.router.parseUrl('/login');
        }
      }

      // ✅ Si no está logueado, permitir acceder al login
      return true;
    }

    return true;
  }
}
