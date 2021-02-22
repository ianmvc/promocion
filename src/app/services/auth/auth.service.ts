import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuario, JwtModel, NuevoUsuario } from '../../common/interface';
import { Observable } from 'rxjs';
import { ApiUrlAuth } from '../../globals';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(ApiUrlAuth + 'login', usuario, cabecera);
  }

  public registro(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(ApiUrlAuth + 'nuevo', usuario, cabecera);
  }
}
