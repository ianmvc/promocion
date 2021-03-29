import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  actRoute: string;
  form: any = {};

  constructor(private activatedRoute: ActivatedRoute,) { 
    this.actRoute = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.form.id = "1";
    this.form.nombreVotante = "";
    this.form.domicilio = "";
    this.form.telcel = "";
    this.form.telcasa = "";
    this.form.seccion = "";
    this.form.validado = "";
    this.form.fecha_agregado = "";
    this.form.fecha_validado = "";
    this.form.colonia = "";
    this.form.comentarios = "";
    this.form.instragram = "";
    this.form.facebook = "";
    this.form.red_social = "";
    this.form.usuario = "";
  }

  onSave(): void {}

  volver(): void {
    window.history.back();
  }
}
