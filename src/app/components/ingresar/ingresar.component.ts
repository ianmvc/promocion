import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss']
})
export class IngresarComponent implements OnInit {

  isesion: FormGroup;
  loading = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isesion = new FormGroup({
      usuario: new FormControl("", [Validators.required]), //, Validators.minLength(4)]),
      contrasena: new FormControl("", [Validators.required]) //, Validators.minLength(6)])
    });
  }

  entrar() {
    this.loading = true;
    this.loading = false;
    this.router.navigateByUrl("/registrar");
  }

}
