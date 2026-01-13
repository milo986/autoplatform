import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
// import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  error?: string;
  access_token?: string;
  token?: string; // por si tu API usa 'token' en lugar de 'access_token'
  usuario?: any;
  user?: any;
  cantAdvisers?: number;
  cantChatAdvs?: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) {}

  // 🔹 Método de login
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}auth/login`, data).pipe(
      map((response) => {
        console.log('response =>> ', response);
        // Guardamos el token si viene
        const token = response.access_token || response.token;
        if (token) {
          localStorage.setItem('token', token);
        }

        // Guardamos el usuario si viene
        const user = response.user || response.usuario;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        return response;
      }),
      catchError(this.handleError)
    );
  }

  // 🔹 Obtener token desde el localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Eliminar sesión
  logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  Swal.fire({
    text: 'Sesión cerrada correctamente.',
    icon: 'success',
    buttonsStyling: false,
    confirmButtonText: 'Ok',
    customClass: { confirmButton: 'btn btn-success' }
  }).then(() => {
    // Redirigimos al login
    window.location.href = '/login';
  });
}


  // 🔹 Obtener usuario actual
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔹 Manejo de errores HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMsg = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMsg = error.error?.msg || error.error?.message || 'Error en el servidor';
    }
    return throwError(() => new Error(errorMsg));
  }
  habilitarFields(parms: boolean) {
    if (parms) {
      const textSms = `
        <p align="center">
          <i class="fa fa-spinner fa-spin text-success fs-2hx"></i><br>
          <span>Un momento por favor....</span>
        </p>
      `;
      Swal.fire({
        html: textSms,
        buttonsStyling: false,
        confirmButtonText: 'Si. inactivar!',
        showCancelButton: false,
        showConfirmButton: false,
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false
      });
    } else {
      Swal.close();
    }
  }
  
}
