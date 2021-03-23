import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Votante } from '../../common/votante';
import { ApiUrl } from '../../globals';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private httpClient: HttpClient
    ) { }

    public lista(): Observable<Votante[]> {
      return this.httpClient.get<Votante[]>(ApiUrl + 'lista', cabecera);
    }
  
    public detalle(id: number): Observable<Votante> {
      return this.httpClient.get<Votante>(ApiUrl + 'detalle/' + id, cabecera);
    }
  
    public crear(producto: Votante): Observable<any> {
      return this.httpClient.post<any>(ApiUrl + 'nuevo', producto, cabecera);
    }
  
    public editar(producto: Votante, id: number): Observable<any> {
      return this.httpClient.put<any>(ApiUrl + 'actualizar/' + id, producto, cabecera);
    }
  
    public borrar(id: number): Observable<any> {
      return this.httpClient.delete<any>(ApiUrl + 'borrar/' + id, cabecera);
    }

    public detalleUser(nombreUser: String): Observable<Votante> {
      return this.httpClient.get<Votante>(ApiUrl + 'usuario/' + nombreUser, cabecera);
    }
}
