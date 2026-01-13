import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-workflows-mas',
  standalone: true, 
  imports: [MatCardModule],
  templateUrl: './workflows-mas.html',
  styleUrls: ['./workflows-mas.scss']
})
export class WorkflowsMas {
  constructor(public themeService: CustomizerSettingsService) {}

  workflows = [
    {
      nombre: 'Cobranza Bancorde',
      ejecuciones: 145,
      tiempoPromedio: '2m 15s'
    },
    {
      nombre: 'Procesamiento Nómina',
      ejecuciones: 89,
      tiempoPromedio: '4m 32s'
    },
    {
      nombre: 'Validación Documentos',
      ejecuciones: 67,
      tiempoPromedio: '1m 45s'
    },
    {
      nombre: 'Envío Reportes',
      ejecuciones: 34,
      tiempoPromedio: '3m 10s'
    }
  ];
}
