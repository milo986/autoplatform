import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  private baseUrl = `${environment.apiUrl}/handlers/`;

  constructor(private http: HttpClient) {}

  /** Obtiene todos los handlers (nodos disponibles) */
  getAllHandlers(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(res => res.data)
    );
  }

  /** Obtiene un handler por tipo */
  getHandlerByType(type: string): Observable<any> {
    return this.http.get<{ success: boolean; data: any }>(`${this.baseUrl}/${type}`).pipe(
      map(res => res.data)
    );
  }
}
