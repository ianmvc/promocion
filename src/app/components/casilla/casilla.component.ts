import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Votante } from '../../common/votante';
import { RegistroService } from '../../services/registro/registro.service';
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
  votante: Votante;
  creado = false;
  failVotante = false;
  mensajeFail = '';
  mensajeOK = '';
  altavotante: FormGroup;
  loading = false;
  username = '';

  fecha1: string = '';
  myDate = new Date();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private serviceVotante: RegistroService,
    private datePipe: DatePipe,
    private tokenService : TokenService
  ) { }


  ngOnInit(): void {
    //this.form = new FormGroup({
      //nombre: new FormControl("", [Validators.required]),
      //domicilio: new FormControl("", [Validators.required]),
      //telcel: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern('0-9')]), 
      //telcasa: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern('0-9')]),
      //seccion: new FormControl("", [Validators.required, Validators.minLength(3)]),
      //fecha_agregado: new FormControl("")
    //});
  }

  onCreate(): void {
    this.fecha1 = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
    this.form.fecha_agregado = this.fecha1
    this.form.validado = "false"
    //console.log(this.form)
    this.username = this.tokenService.getUserName();
    this.form.usuario = this.username
    console.log(this.username) 
    console.log(this.form) 
    this.serviceVotante.crear(this.form).subscribe(data => {
      this.mensajeOK = data.mensaje;
      this.openDialog(this.mensajeOK);
      this.creado = true;
      this.failVotante = false;
      this.router.navigateByUrl("/registrar");
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
