import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-profile-intro',
    imports: [MatCardModule],
    templateUrl: './mp-profile-intro.component.html',
    styleUrl: './mp-profile-intro.component.scss'
})
export class MpProfileIntroComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}