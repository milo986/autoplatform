import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [
        // RouterLink, 
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    // Password Hide
    hide = true;

    loginForm: FormGroup;
    isLoading = true;
    isToggled = false;
    loading = false;
    public themeService = inject(CustomizerSettingsService);
    private authService = inject(AuthService);
    public router = inject(Router);

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(10)]]
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void { }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        // if (this.loginForm.valid) {
            const formData = this.loginForm.value;
            this.isLoading = true;
            this.router.navigate(['/dashboard']);


            // this.authService.login(formData).subscribe({
            //     next: (res) => {
            //         this.isLoading = false;

            //         const token = res.access_token || res.token;
            //         const user = res.usuario || res.user;

            //         if (token) localStorage.setItem('token', token);
            //         if (user) localStorage.setItem('user', JSON.stringify(user));

            //         // 🔹 Validamos rol del usuario
            //         const rolUsuario = user?.rol?.rol || user?.rol;

            //         if (rolUsuario === 'Asesor') {
            //             // ✅ Redirección solo si es asesor
            //             this.router.navigate(['/dashboard']);

            //             Swal.fire({
            //                 text: 'Inicio de sesión exitoso.',
            //                 icon: 'success',
            //                 buttonsStyling: false,
            //                 confirmButtonText: 'Continuar',
            //                 customClass: { confirmButton: 'btn btn-success' }
            //             });
            //         } else {
            //             // ❌ Si no es asesor, mostramos error y no redirigimos
            //             Swal.fire({
            //                 text: 'Acceso denegado. Solo los usuarios con rol “asesor” pueden ingresar.',
            //                 icon: 'error',
            //                 buttonsStyling: false,
            //                 confirmButtonText: 'Entendido',
            //                 customClass: { confirmButton: 'btn btn-danger' }
            //             });

            //             // 🔹 Limpiamos sesión por seguridad
            //             this.authService.logout();
            //         }
            //     },
            //     error: (err) => {
            //         this.isLoading = false;
            //         console.error('Error en login:', err);

            //         Swal.fire({
            //             text: err.message || 'Error en las credenciales. Inténtalo de nuevo.',
            //             icon: 'error',
            //             buttonsStyling: false,
            //             confirmButtonText: 'Ok, validaré!',
            //             customClass: { confirmButton: 'btn btn-primary' }
            //         }).then((result) => {
            //             if (result.isConfirmed) {
            //                 this.authService.habilitarFields(false);
            //             }
            //         });
            //     }
            // });
        // } else {
        //     Swal.fire({
        //         text: 'Lo sentimos, parece que se han detectado algunos errores. Inténtalo de nuevo.',
        //         icon: 'error',
        //         buttonsStyling: false,
        //         confirmButtonText: 'Ok, validaré!',
        //         customClass: { confirmButton: 'btn btn-primary' }
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             this.authService.habilitarFields(false);
        //         }
        //     });
        // }
    }

}