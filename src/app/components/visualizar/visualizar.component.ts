import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { RegistroService } from '../../services/registro/registro.service';
import { Votante } from '../../common/votante';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../common/dialog-confirm/dialog-confirm.component';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent  implements OnInit, AfterViewInit  {
  dataSource: Votante[] = [];

  displayedColumns: string[] = ['position', 'nombre', 'domicilio', 'telcel', 'telcasa', 'seccion', 'fecha_agregado', 'fecha_validado', 'validado'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: any = {};
  isLogin = false;
  roles: string[];
  authority: string;
  numberid: number;
  mensajeOK = '';
  mensajeFail = '';
  ideditar = "";
  length: number;

  fecha1: string = '';
  myDate = new Date();
  constructor(
    private serviceVotante: RegistroService,
    private tokenService: TokenService,
    private router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }
  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.lista();
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  lista(): void {
    this.serviceVotante.lista().subscribe(data => {
      this.dataSource = data;
      this.length = this.dataSource.length;
      //console.log(this.dataSource.length)
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['home']);
  }

  validar(id){
    //console.log(id)
    this.ideditar = id;
    this.mensajeOK = "El registro se validará, ¿Está seguro que desea ratificar como verdadera la información proporcionada?"
    this.openDialogConfirm(this.mensajeOK);
  }

  openDialogConfirm(mensaje: string, status?: string): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: { mensaje: mensaje }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "Ok")
      this.editar(this.ideditar);
    });
  }

  editar(id){
    //console.log(id)
    this.numberid = id;
    this.serviceVotante.detalle(this.numberid).subscribe(data => {
      this.form = data;
      this.fecha1 = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
      this.form.fecha_validado = this.fecha1
      this.form.validado = true
      //console.log(id)
      this.serviceVotante.editar(this.form, this.numberid).subscribe(data => {
        this.form = data;
        this.openDialog(data.mensaje);
        this.ngOnInit();
        //this.router.navigateByUrl("/registrar");
      },
        (err: any) => {
          this.mensajeFail = err.error.mensaje;
          //console.log(err)
          this.openDialog(this.mensajeFail);
        }
      );
      //console.log(this.form)
      //this.openDialog(this.mensajeOK);
      //this.router.navigateByUrl("/registrar");
    },
      (err: any) => {
        //console.log(err)
        this.mensajeFail = err.error.mensaje;
        this.openDialog(this.mensajeFail);
      }
    );

  }

  openDialog(mensaje: string, status?: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { mensaje: mensaje }
    });
  }

}
