import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EjecucionesHoy } from './ejecuciones-hoy/ejecuciones-hoy';
import { TasaExito } from './tasa-exito/tasa-exito';
import { WorkflowsActivos } from './workflows-activos/workflows-activos';
import { WorkflowsMas } from './workflows-mas/workflows-mas';
import { TiempoPromedio } from './tiempo-promedio/tiempo-promedio';
import { UltimasEjecuciones } from './ultimas-ejecuciones/ultimas-ejecuciones';


interface Stat {
  name: string;
  value: string;
  change: string;
  icon: string;
  color: string; // 👈 esta es la que faltaba
}

interface Execution {
  id: number;
  name: string;
  timeAgo: string;
  duration: string;
}

interface Workflow {
  name: string;
  count: number;
  avgTime: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    EjecucionesHoy,
    TasaExito,
    WorkflowsActivos,
    WorkflowsMas,
    TiempoPromedio,
    UltimasEjecuciones,   
  ],  
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  stats: Stat[] = [
    { name: 'Workflows Activos', value: '12', change: '+4.75%', icon: 'hub', color: 'text-indigo-500' },
    { name: 'Ejecuciones Hoy', value: '1,234', change: '+5.42%', icon: 'analytics', color: 'text-green-500' },
    { name: 'Tiempo Promedio', value: '2.3m', change: '-1.39%', icon: 'timer', color: 'text-yellow-500' },
    { name: 'Tasa de Éxito', value: '98.5%', change: '+2.02%', icon: 'check_circle', color: 'text-emerald-500' },
  ];

  recentExecutions: Execution[] = [
    { id: 1, name: 'Cobranza Bancorde', timeAgo: '5 minutos', duration: '2m 34s' },
    { id: 2, name: 'Procesamiento Nómina', timeAgo: '11 minutos', duration: '1m 12s' },
    { id: 3, name: 'Validación Documentos', timeAgo: '12 minutos', duration: '45s' },
    { id: 4, name: 'Envío Reportes', timeAgo: '15 minutos', duration: '3m 21s' },
  ];

  activeWorkflows: Workflow[] = [
    { name: 'Cobranza Bancorde', count: 145, avgTime: '2m 15s' },
    { name: 'Procesamiento Nómina', count: 89, avgTime: '4m 32s' },
    { name: 'Validación Documentos', count: 67, avgTime: '3m 10s' },
    { name: 'Envío Reportes', count: 34, avgTime: '3m 46s' },
  ];
}
