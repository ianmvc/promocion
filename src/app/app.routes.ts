import { RouterModule, Routes } from '@angular/router';
import { IngresarComponent } from './components/ingresar/ingresar.component';

const APP_ROUTES: Routes = [
    { path: 'ingresar', component: IngresarComponent },
    //Ruta por defecto
    { path: '**', pathMatch: 'full', redirectTo: 'ingresar' }
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' });