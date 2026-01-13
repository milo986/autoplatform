import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(`${environment.apiUrl}usuarios`)
  }

  updateUser(id: string, data: any,): Observable<any> {
    console.log(id, data)
    return this.http.put(`${environment.apiUrl}usuarios/${id}`, data);
  }

  createUser(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.apiUrl}usuarios/create`, data, { headers });
  }

  userStatus(idUser: string, status: boolean): Observable<any> {
    const url = `${environment.apiUrl}usuarios/statusChange`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { idUser, status };

    // Show loading Swal
    Swal.fire({
      html: `
        <div class="text-center">
          <p>
            <i class="fa fa-spinner fa-spin text-success" style="font-size:35px;"></i>
            <br><br>
            <span>Un momento por favor......</span>
          </p>
        </div>
      `,
      buttonsStyling: false,
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });

    return this.http.post(url, body, { headers });
  }

  postUsuarioSeg(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('dtaaaaaaa====================', data, headers)
    return this.http.post<any>(`${environment.apiUrl}usuarios/usuarioSeg`, data, { headers });
  }
}
