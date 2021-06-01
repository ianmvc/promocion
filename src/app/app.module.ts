import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';

import { DialogComponent } from './common/dialog/dialog.component';
import { DialogConfirmComponent } from './common/dialog-confirm/dialog-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';

import { APP_ROUTING } from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { interceptorProvider } from './services/interceptor/interceptor.service';
import { EditComponent } from './components/edit/edit.component';
import { CasillaComponent } from './components/casilla/casilla.component'

@NgModule({
  declarations: [
    AppComponent,
    IngresarComponent,
    RegistrarComponent,
    VisualizarComponent,
    RegistroComponent,
    DialogComponent,
    DialogConfirmComponent,
    EditComponent,
    CasillaComponent
  ],
  imports: [
    APP_ROUTING,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [interceptorProvider, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
