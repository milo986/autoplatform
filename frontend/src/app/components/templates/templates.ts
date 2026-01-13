import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WorkflowService } from '../../services/workflows.service';

@Component({
  selector: 'app-workflows',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates implements OnInit {

  // filtros (signals)
  searchTerm = signal('');
  categoryFilter = signal('all');
  statusFilter = signal('all');
  showList = true;
  selectedWorkflow: any = null;
  workflow = signal<any | null>(null);
  isLoading = signal(true); // 💡 Nuevo: Para manejar el estado de carga

  // dataset real - inicializado vacío
  workflows = signal<any[]>([]); // 👈 CAMBIADO: Array vacío para recibir datos de API

  // categorías dinámicas
  // Nota: Usa 'computed' para acceder al valor actual de 'workflows'
  categories = computed(() => {
    const cats = this.workflows().map(w => w.category);
    return [...new Set(cats)];
  });

  // filtrado dinámico
  filteredWorkflows = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const cat = this.categoryFilter();
    const stat = this.statusFilter();

    return this.workflows().filter(w =>
      w.name.toLowerCase().includes(term) &&
      (cat === 'all' || w.category === cat) &&
      (stat === 'all' || w.status === stat)
    );
  });

  constructor(
    public themeService: CustomizerSettingsService,
    private workflowService: WorkflowService
  ) { }

  // 🚀 Carga inicial de datos
  ngOnInit(): void {
    this.getAllWorkflows();
  }

  // handlers
  onSearchChange(value: string) {
    this.searchTerm.set(value);
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.categoryFilter.set(value);
  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.statusFilter.set(value);
  }

  // colores para badges
  getStatusColor(isActive: boolean) { // 👈 Acepta un booleano
    // Devuelve la clase CSS apropiada
    return isActive ? 'badge-active' : 'badge-inactive';
  }

  // Nuevo método para mostrar el texto
  getStatusText(isActive: boolean): string {
    return isActive ? 'Activo' : 'Inactivo';
  }

  getSuccessColor(rate: number) {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-danger';
  }

  /** Llama a la API para obtener todos los workflows y los almacena en la signal */
  getAllWorkflows() {
    this.isLoading.set(true); // Iniciar carga

    this.workflowService.getAllWorkflows().subscribe({
      next: (data) => {
        console.log('data=>> ', data);
        const workflowsData = data.data || data;
        this.workflows.set(workflowsData);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando workflows:', err);
        this.isLoading.set(false); // Finalizar carga
        // Opcional: Establecer un array vacío si falla la carga
        this.workflows.set([]);
      }
    });
  }

  getWorkflowById(id: string) {
    this.workflowService.getWorkflowById(id).subscribe({
      next: (data) => {
        this.workflow.set(data.data || data);
      },
      error: (err) => console.error('Error cargando workflow por ID:', err)
    });
  }
}