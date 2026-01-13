import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { RevenueGrowthService } from './revenue-growth.service';

@Component({
  selector: 'app-workflows-activos',
  imports: [
    MatCardModule
  ],
  templateUrl: './workflows-activos.html',
  styleUrl: './workflows-activos.scss',
})
export class WorkflowsActivos {
  constructor(
    public themeService: CustomizerSettingsService,
    private revenueGrowthService: RevenueGrowthService
  ) { }

  ngOnInit(): void {
    this.revenueGrowthService.loadChart();
  }
}
