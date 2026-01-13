import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-ejecuciones',
  imports: [
    // RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
  ],
  templateUrl: './ejecuciones.html',
  styleUrl: './ejecuciones.scss',
})
export class Ejecuciones {
  displayedColumns: string[] = ['workflow', 'estado', 'inicio', 'duracion', 'registros', 'usuario', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  // Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ticketTitle + 1}`;
  // }

  // Popup Trigger
  classApplied = false;
  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  constructor(
    public themeService: CustomizerSettingsService
  ) { }
}


export interface PeriodicElement {
  id: string;
  workflow: string;
  estado: any;
  inicio: string;
  duracion: string;
  registros: string;
  usuario: string;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: '#854',
    workflow: 'Cobranza Bancorde',
    estado: {
      completado: true,
      ejecutando: false,
      fallo: false,
      cancelado: false
    },
    inicio: '30 Apr 2025',
    duracion: '2m 34s',
    registros: '1543',
    usuario: 'Sistema',
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete'
    }
  },
  {
    id: '#853',
    workflow: 'Cloud Migration',
    estado: {
      completado: false,
      ejecutando: true,
      fallo: false,
      cancelado: false
    },
    inicio: '25 Apr 2025',
    duracion: '1m 12s',
    registros: '89',
    usuario: 'usuario Admin',
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete'
    }
  },
  {
    id: '#852',
    workflow: 'Website Revamp',
    estado: {
      completado: false,
      ejecutando: false,
      fallo: true,
      cancelado: false
    },
    inicio: '20 Apr 2025',
    duracion: '45s',
    registros: '12',
    usuario: 'Sistema',
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete'
    }
  },
  {
    id: '#851',
    workflow: 'Mobile Application',
    estado: {
      completado: false,
      ejecutando: false,
      fallo: false,
      cancelado: true
    },
    inicio: '15 Apr 2025',
    duracion: '3m 21s	',
    registros: '234',
    usuario: 'usuario Admin	',
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete'
    }
  }
];
