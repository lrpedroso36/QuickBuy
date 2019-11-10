import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../model/produto";

@Component({
    selector: "app-produto",
    templateUrl: "./produto.component.html",
    styleUrls: ["./produto.component.css"]
})

export class ProdutoComponent implements OnInit {
    private produto: Produto;
    public arquivoSelecionado: File;
    public ativar_spinner: boolean;
    public menssagem: string;

    constructor(private produtoServico: ProdutoServico) {

    }

    ngOnInit(): void {
        this.produto = new Produto();
    }

    public inputChange(files: FileList) {
        this.arquivoSelecionado = files.item(0);
        this.ativar_spinner = true;
        this.produtoServico.enviarArquivo(this.arquivoSelecionado)
            .subscribe(nomeArquivo => {
                this.produto.nomeArquivo = nomeArquivo;
                alert(this.produto.nomeArquivo);
                console.log(nomeArquivo);
                this.ativar_spinner = false;
            },
                error => {
                    console.log(error);
                    this.ativar_spinner = false;
                });
    }

    public cadastrar() {
        this.produtoServico.cadastar(this.produto)
            .subscribe(
                produtoJson => {
                    console.log(produtoJson);
               },
                e => {
                    console.log(e);
                    this.menssagem = e.error;
                }
            );
    }
}
