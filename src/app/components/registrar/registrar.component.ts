import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroService } from '../../services/registro.service';
import { Votante } from '../../common/votante';

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

  constructor(
    private registroService: RegistroService
  ) { }
  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.lista();
  }

  lista(): void {
    this.registroService.lista().subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource.length)
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
