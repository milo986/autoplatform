import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TotalOrdersService } from './total-orders.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tiempo-promedio',
  imports: [
    MatCardModule
  ],
  templateUrl: './tiempo-promedio.html',
  styleUrl: './tiempo-promedio.scss',
})
export class TiempoPromedio {

  constructor(
    public themeService: CustomizerSettingsService,
    private totalOrdersService: TotalOrdersService
  ) { }

  ngOnInit(): void {
    this.totalOrdersService.loadChart();
  }

}
