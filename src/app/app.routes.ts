import { RouterModule, Routes } from '@angular/router';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';
import { RegistroComponent } from './components/registro/registro.component';

const APP_ROUTES: Routes = [
    { path: 'ingresar', component: IngresarComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: 'visualizar', component: VisualizarComponent },
    { path: 'registro', component: RegistroComponent },
    //Ruta por defecto
    { path: '**', pathMatch: 'full', redirectTo: 'ingresar' }
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' });