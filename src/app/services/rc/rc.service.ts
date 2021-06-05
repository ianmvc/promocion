import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rcasilla } from '../../common/interface';
import { ApiUrlRc } from '../../globals';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class RcService {

  constructor(
    private httpClient: HttpClient
    ) { }

    public crear(producto: rcasilla): Observable<any> {
      return this.httpClient.post<any>(ApiUrlRc + 'nuevo', producto, cabecera);
    }
}
