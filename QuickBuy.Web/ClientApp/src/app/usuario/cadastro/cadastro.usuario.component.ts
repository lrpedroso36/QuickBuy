import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../../model/usuario";
import { UsuarioServico } from "../../../servicos/usuario/usuario.servico";

@Component({
    selector: "novo-usuario",
    templateUrl: "./cadastro.usuario.component.html",
    styleUrls: ["cadastro.usuario.component.css"]
})

export class CadastroUsuarioComponent implements OnInit {
    public usuario: Usuario;

    constructor(private usuarioServico: UsuarioServico) {

    }

    ngOnInit(): void {
        this.usuario = new Usuario();
    }

    public cadastrar() {
        var usuario_verificado = this.usuarioServico.cadastrarUsuario(this.usuario)
            .subscribe(
                usuarioRetorno => {

                },
                usuarioError => {

                }
            );
    }
}