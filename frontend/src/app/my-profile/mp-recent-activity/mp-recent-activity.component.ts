import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-recent-activity',
    imports: [MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './mp-recent-activity.component.html',
    styleUrl: './mp-recent-activity.component.scss'
})
export class MpRecentActivityComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}