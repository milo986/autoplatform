import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-starter',
    imports: [RouterLink, MatCardModule, MatButtonModule],
    templateUrl: './starter.component.html',
    styleUrl: './starter.component.scss'
})
export class StarterComponent {}