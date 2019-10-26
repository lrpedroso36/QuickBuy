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
            .subscribe(data =>{

            }, err => {

            });


        //if (this.usuario.email == "leandro@teste.com.br" && this.usuario.senha == "abc123") {
        //    sessionStorage.setItem("usuario-autenticado", "1");
        //    this.router.navigate([this.returnUrl]);
        //}
    }
}
