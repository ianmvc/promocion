export interface DialogData {
    mensaje: string;
}

export class JwtModel {
    token: string;
    type: string;
    nombreUsuario: string;
    authorities: string[];
}

export class NuevoUsuario {
    nombre: string;
    nombreUsuario: string;
    email: string;
    roles: string[];
    password: string;

    constructor(nombre: string, nombreUsuario: string, email: string, password: string) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.roles = ['user'];
    }
}

export class LoginUsuario {
    nombreUsuario: string;
    password: string;
    constructor(nombreUsuario: string, password: string) {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}