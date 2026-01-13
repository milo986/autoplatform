import { Component, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-ultimas-ejecuciones',
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule
    ],
    templateUrl: './ultimas-ejecuciones.html',
    styleUrl: './ultimas-ejecuciones.scss',
})
export class UltimasEjecuciones {
    displayedColumns: string[] = ['proceso', 'tiempo'];

    ejecuciones = new MatTableDataSource([
        {
            nombre: 'Cobranza Bancorde',
            hace: '5 minutos',
            tiempo: '2m 34s',
            estado: 'Completado',
        },
        {
            nombre: 'Procesamiento Nómina',
            hace: '8 minutos',
            tiempo: '1m 12s',
            estado: 'Ejecutando',
        },
        {
            nombre: 'Validación Documentos',
            hace: '12 minutos',
            tiempo: '45s',
            estado: 'Falló',
        },
        {
            nombre: 'Envío Reportes',
            hace: '15 minutos',
            tiempo: '3m 21s',
            estado: 'Completado',
        },
    ]);
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
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

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.customer + 1}`;
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) { }

}

export interface PeriodicElement {
    customer: any;
    email: string;
    source: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        customer: {
            img: 'images/users/user11.jpg',
            name: 'David Brown'
        },
        email: 'david@trezo.com',
        source: 'Organic',
        status: {
            confirmed: true,
            inProgress: false,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Sarah Miller'
        },
        email: 'sarah@trezo.com',
        source: 'Social',
        status: {
            confirmed: false,
            inProgress: false,
            pending: true,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Michael Wilson'
        },
        email: 'micheal@trezo.com',
        source: 'Website',
        status: {
            confirmed: false,
            inProgress: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user8.jpg',
            name: 'Amanda Clark'
        },
        email: 'amanda@trezo.com',
        source: 'Paid',
        status: {
            confirmed: true,
            inProgress: false,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Jennifer Taylor'
        },
        email: 'taylor@trezo.com',
        source: 'Others',
        status: {
            confirmed: false,
            inProgress: false,
            pending: false,
            rejected: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Sarah Miller'
        },
        email: 'sarah@trezo.com',
        source: 'Social',
        status: {
            confirmed: false,
            inProgress: false,
            pending: true,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Jennifer Taylor'
        },
        email: 'taylor@trezo.com',
        source: 'Others',
        status: {
            confirmed: false,
            inProgress: false,
            pending: false,
            rejected: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Amanda Clark'
        },
        email: 'amanda@trezo.com',
        source: 'Paid',
        status: {
            confirmed: true,
            inProgress: false,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Michael Wilson'
        },
        email: 'micheal@trezo.com',
        source: 'Website',
        status: {
            confirmed: false,
            inProgress: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user11.jpg',
            name: 'David Brown'
        },
        email: 'david@trezo.com',
        source: 'Organic',
        status: {
            confirmed: true,
            inProgress: false,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
];