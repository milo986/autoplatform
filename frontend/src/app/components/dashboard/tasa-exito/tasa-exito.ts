import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { AnnualProfitService } from './annual-profit.service';

@Component({
  selector: 'app-tasa-exito',
  imports: [
    MatCardModule,
  ],
  templateUrl: './tasa-exito.html',
  styleUrl: './tasa-exito.scss',
})
export class TasaExito {
  constructor(
    public themeService: CustomizerSettingsService,
    private annualProfitService: AnnualProfitService
  ) { }

  ngOnInit(): void {
    this.annualProfitService.loadChart();
  }
}
