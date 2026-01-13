import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { LeadConversionService } from './lead-conversion.service';

@Component({
  selector: 'app-ejecuciones-hoy',
  imports: [
    MatCardModule,
  ],
  templateUrl: './ejecuciones-hoy.html',
  styleUrl: './ejecuciones-hoy.scss',
})
export class EjecucionesHoy {
  constructor(
    public themeService: CustomizerSettingsService,
    private leadConversionService: LeadConversionService
) {}

ngOnInit(): void {
    this.leadConversionService.loadChart();
}
}
