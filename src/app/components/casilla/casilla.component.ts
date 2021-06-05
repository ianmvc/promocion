import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { rcasilla } from '../../common/interface';
import { RcService } from '../../services/rc/rc.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { DatePipe } from '@angular/common';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-casilla',
  templateUrl: './casilla.component.html',
  styleUrls: ['./casilla.component.scss']
})
export class CasillaComponent implements OnInit {
  form: any = {};
  rcasilla: rcasilla;
  creado = false;
  failVotante = false;
  mensajeFail = '';
  mensajeOK = '';
  altavotante: FormGroup;
  loading = false;
  username = '';
  seccion = '';
  casilla = '';

  fecha1: string = '';
  myDate = new Date();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private serviciovotos: RcService,
    private datePipe: DatePipe,
    private tokenService : TokenService
  ) { }


  ngOnInit(): void {
  }

  onCreate(): void {
    this.fecha1 = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
    this.form.hora = this.fecha1
    this.form.registrado = "true"
   console.log(this.form)
    this.username = this.tokenService.getUserName();
    this.seccion = this.username.substr(1,3)
    this.casilla = this.username.substr(4,6)

    console.log(this.seccion)
    console.log(this.casilla)

    this.form.seccion = this.seccion
    this.form.casilla = this.casilla
    this.serviciovotos.crear(this.form).subscribe(data => {
      this.mensajeOK = data.mensaje;
      this.openDialog(this.mensajeOK);
      this.creado = true;
      this.failVotante = false;
      this.router.navigateByUrl("/casilla");
    },
      (err: any) => {
        this.mensajeFail = err.error.mensaje;
        this.openDialog(this.mensajeFail);
        this.creado = false;
        this.failVotante = true;
      }
    );
  }

  volver(): void {
    window.history.back();
  }

  openDialog(mensaje: string, status?: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { mensaje: mensaje }
    });
  }
}
