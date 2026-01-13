import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface Workflow {
  _id?: string;
  name: string;
  description?: string;
  workflow: {
    nodes: any[];
    connections: any[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  private apiUrl = `${environment.apiUrl}/workflows`;

  constructor(private http: HttpClient) {}

  /** 🟢 Obtener todos los workflows */
  getAllWorkflows(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  /** 🔵 Obtener un workflow por ID */
  getWorkflowById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /** 🟡 Crear un nuevo workflow */
  createWorkflow(data: Workflow): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  /** 🟠 Actualizar workflow existente */
  updateWorkflow(id: string, data: Workflow): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  /** 🔴 Eliminar workflow */
  deleteWorkflow(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /** ⚙️ Ejecutar workflow */
  executeWorkflow(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/execute`, payload);
  }

  /** ✅ Validar workflow */
  validateWorkflow(data: Workflow): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate`, data);
  }

  /** 📜 Obtener ejecuciones de un workflow */
  getWorkflowExecutions(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/executions`);
  }
}
