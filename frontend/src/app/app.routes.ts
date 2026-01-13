import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ComponentsComponent } from './components/components.component';
import { Dashboard } from './components/dashboard/dashboard';
import { Workflows } from './components/workflows/workflows';
import { Templates } from './components/templates/templates';
import { Ejecuciones } from './components/ejecuciones/ejecuciones';
import { Usuarios } from './components/usuarios/usuarios';
import { Configuracion } from './components/configuracion/configuracion';
import path from 'path';
import { WorkflowEditor } from './components/workflows/create-workflows/workflow-editor';
import { Formularios } from './components/formularios/formularios';

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        // canActivate: [LoginGuard],
        component: AuthenticationComponent,
        children: [
            { path: 'login', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'confirm-email', component: ConfirmEmailComponent },
            { path: 'lock-screen', component: LockScreenComponent },
            { path: 'logout', component: LogoutComponent }
        ]
    },
    {
        path: '',
        // canActivate: [AuthGuard],
        component: ComponentsComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                component: Dashboard,
                // children: [
                // ]
            },
            {
                path: 'workflows',
                component: Workflows
            },
            {
                path: 'workflows/edit',
                component: WorkflowEditor
            },
            { path: 'templates', component: Templates },
            { path: 'ejecuciones', component: Ejecuciones },
            { path: 'users', component: Usuarios },
            { path: 'settings', component: Configuracion },
            { path: 'Formularios', component: Formularios }
        ]
    },
    { path: '**', component: NotFoundComponent }
];