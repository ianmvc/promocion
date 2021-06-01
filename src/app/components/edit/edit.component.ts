import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Votante } from '../../common/votante';
import { Router } from '@angular/router';
import { RegistroService } from '../../services/registro/registro.service';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  dataSource: Votante[] = [];
  id: number;
  form: any = {};
  mensajeOK = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private registroService: RegistroService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.registroService.detalle(this.id).subscribe(data => {
      this.form.id = data.id;
      this.form.nombreVotante = data.nombreVotante;
      this.form.domicilio = data.domicilio;
      this.form.telcel = data.telcel;
      this.form.telcasa = data.telcasa;
      this.form.seccion = data.seccion;
      this.form.validado = data.validado;
      this.form.fecha_agregado = data.fecha_agregado;
      this.form.fecha_validado = data.fecha_validado;
      this.form.colonia = data.colonia;
      this.form.comentarios = data.comentarios;
      this.form.instragram = data.instragram;
      this.form.facebook = data.facebook;
      this.form.red_social = data.red_social;
      this.form.usuario = data.usuario;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onSave(): void { 
    console.log(this.form)
    this.registroService.editar(this.form,this.id).subscribe(data => {
      this.mensajeOK = data.mensaje;
      this.openDialog(this.mensajeOK);
      this.router.navigateByUrl("/visualizar");
    },
      (err: any) => {
        console.log(err);
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
