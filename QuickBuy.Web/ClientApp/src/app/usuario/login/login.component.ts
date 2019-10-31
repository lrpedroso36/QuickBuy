import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Usuario } from "../../../model/usuario";
import { UsuarioServico } from "../../../servicos/usuario/usuario.servico";


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
    public usuario;
    public returnUrl: string;
    public mensagem: string;

    constructor(private router: Router,
        private activatedRouter: ActivatedRoute,
        private usuarioServico: UsuarioServico) {
    }

    ngOnInit(): void {
        this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
        this.usuario = new Usuario();
    }

    entrar() {
        this.usuarioServico.verificarUsuario(this.usuario)
            .subscribe(data => {
                var usuarioRetorno: Usuario;
                usuarioRetorno = data;
                sessionStorage.setItem("usuario-autenticado", "1");
                sessionStorage.setItem("email-usuario", usuarioRetorno.email);

                if (this.returnUrl == null) {
                    this.router.navigate(["/"]);

                } else {
                    this.router.navigate([this.returnUrl]);
                }
            }, err => {
                console.log(err.error);
                this.mensagem = err.error;
            });
    }
}
