import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-welcome',
    imports: [MatCardModule],
    templateUrl: './mp-welcome.component.html',
    styleUrl: './mp-welcome.component.scss'
})
export class MpWelcomeComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}