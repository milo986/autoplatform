import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatCheckboxModule,
    MatTabsModule,
    RouterLink
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {

  constructor(
    public themeService: CustomizerSettingsService 
  ){}

}
