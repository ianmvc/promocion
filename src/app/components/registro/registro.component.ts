import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Votante } from '../../common/votante';
import { RegistroService } from '../../services/registro.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  form: any = {};
  votante: Votante;
  creado = false;
  failVotante = false;
  mensajeFail = '';
  mensajeOK = '';
  altavotante: FormGroup;
  loading = false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private serviceVotante: RegistroService
  ) { }


  ngOnInit(): void {
    this.altavotante = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      domicilio: new FormControl("", [Validators.required]),
      telcel: new FormControl("", [Validators.required]), 
      telcasa: new FormControl("", [Validators.required]),
      seccion: new FormControl("", [Validators.required])
    });
  }

  onCreate(): void {
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
