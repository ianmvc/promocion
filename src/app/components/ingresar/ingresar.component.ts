import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';

import {LoginUsuario} from '../../common/interface';
import {AuthService} from '../../services/auth/auth.service';
import {TokenService} from '../../services/token/token.service';

@Component({selector: 'app-ingresar', templateUrl: './ingresar.component.html', styleUrls: ['./ingresar.component.scss']})
export class IngresarComponent implements OnInit {

    form : any = {};
    usuario : LoginUsuario;
    isLogged = false;
    isLoginFail = false;
    roles : string[] = [];
    errorMsg = 'Credenciales Invalidas';

    constructor(private router : Router, private authService : AuthService, private tokenService : TokenService) {}

    ngOnInit(): void {
        if (this.tokenService.getToken()) 
        this.router.navigateByUrl("/registrar");
        else
        this.router.navigateByUrl("/");
    }

    onLogin(): void {
        this.usuario = new LoginUsuario(this.form.nombreUsuario, this.form.password);

        this.authService.login(this.usuario).subscribe(data => {
            this.tokenService.setToken(data.token);
            this.tokenService.setUserName(data.nombreUsuario);
            this.tokenService.setAuthorities(data.authorities);

            this.isLogged = true;
            this.isLoginFail = false;
            this.roles = this.tokenService.getAuthorities();
            console.log(this.roles)
            if (this.roles[0] == "ROLE_USER")
                this.router.navigateByUrl("/registrar");
             else
                this.router.navigateByUrl("/visualizar")

        }, (err : any) => {
            this.isLogged = false;
            this.isLoginFail = true;
            this.errorMsg = err.error.message;
        });
    }

}
