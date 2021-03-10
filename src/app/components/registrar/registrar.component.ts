import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { RegistroService } from '../../services/registro/registro.service';
import { Votante } from '../../common/votante';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})

export class RegistrarComponent implements OnInit, AfterViewInit  {
  dataSource: Votante[] = [];

  displayedColumns: string[] = ['position', 'nombre', 'domicilio', 'telcel', 'telcasa', 'seccion'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLogin = false;
  roles: string[];
  authority: string;
  length: number;
  constructor(
    private registroService: RegistroService,
    private tokenService: TokenService,
    private router: Router
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
    else
    this.router.navigate(['']);
  }

  lista(): void {
    this.registroService.lista().subscribe(data => {
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

}
