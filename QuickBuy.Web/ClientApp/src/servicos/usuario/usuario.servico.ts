import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Usuario } from "../../model/usuario";

@Injectable({
    providedIn: "root"
})
export class UsuarioServico {
    private baseURL: string;
    private _usuario: Usuario;

    set usuario(usuario: Usuario) {
        sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
        this._usuario = usuario;
    }

    get usuario(): Usuario {
        let usuario_json = sessionStorage.getItem("usuario-autenticado");
        console.log(usuario_json);
        this._usuario = JSON.parse(usuario_json);
        return this._usuario;
    }

    get headers(): HttpHeaders {
        return new HttpHeaders().set('content-type', 'application/json');
    }

    public usuario_autenticado(): boolean {
        return this._usuario != null && this._usuario.email != "" && this._usuario.senha != "";
    }

    public usuario_administrador(): boolean {
        return this.usuario_autenticado() && this.usuario.administrador;
    }

    public limpar_sessao() {
        sessionStorage.setItem("usuario-autenticado", "");
        this._usuario = null;
    }

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseURL = baseUrl;
    }

    public verificarUsuario(usuario: Usuario): Observable<Usuario> {
        const headers = new HttpHeaders().set('content-type', 'application/json');

        var boby = {
            email: usuario.email,
            senha: usuario.senha
        }

        return this.http.post<Usuario>(this.baseURL + 'api/usuario/verificar', boby, { headers });
    }

    public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.baseURL + "api/usuario", JSON.stringify(usuario), { headers: this.headers });
    }
}
