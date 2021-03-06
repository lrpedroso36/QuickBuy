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
    public ativar_spinner: boolean;
    public mensagem: string;
    public usuarioCadastrado: boolean;

    constructor(private usuarioServico: UsuarioServico) {

    }

    ngOnInit(): void {
        this.usuario = new Usuario();
    }

    public cadastrar() {
        this.ativar_spinner = true;

        var usuario_verificado = this.usuarioServico.cadastrarUsuario(this.usuario)
            .subscribe(
                usuarioRetorno => {
                    this.usuarioCadastrado = true;
                    this.mensagem = "";
                    this.ativar_spinner = false
                },
                usuarioError => {
                    this.mensagem = usuarioError.error;
                    this.ativar_spinner = false
                }
            );
    }
}
