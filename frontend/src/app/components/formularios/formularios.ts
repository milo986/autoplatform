import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';


@Component({
  selector: 'app-formularios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './formularios.html',
  styleUrl: './formularios.scss',
})
export class Formularios implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  showForm = false;

  sourceForm!: FormGroup;
  configForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sourceForm = this.fb.group({
      source: ['', Validators.required]
    });

    this.configForm = this.fb.group({
      gmailEmail: [''],
      ftpHost: [''],
      ftpUser: [''],
      ftpPass: [''],
      httpEndpoint: [''],
      driveFolderId: ['']
    });
  }

  start() {
    this.showForm = true;
  }

  cancel() {
    this.showForm = false;
    this.sourceForm.reset();
    this.configForm.reset();
    this.stepper?.reset();
  }

  goNext(stepper: MatStepper) {
    stepper.next();
  }

isConfigValid(): boolean {
  const source = this.sourceForm.value.source;
  const c = this.configForm.controls;

  switch (source) {
    case 'gmail':
      return !!c['gmailEmail']?.value;
    case 'ftp':
      return (
        !!c['ftpHost']?.value &&
        !!c['ftpUser']?.value &&
        !!c['ftpPass']?.value
      );
    case 'http':
      return !!c['httpEndpoint']?.value;
    case 'drive':
      return !!c['driveFolderId']?.value;
    default:
      return false;
  }
}


  buildJson() {
    return {
      source: this.sourceForm.value.source,
      config: this.configForm.value
    };
  }

  submit() {
    const payload = this.buildJson();
    console.log('JSON listo para n8n:', payload);
    alert('JSON generado. Revisa la consola.');
  }
}
