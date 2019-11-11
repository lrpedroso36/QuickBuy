import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../model/produto";
import { Router } from "@angular/router";

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

    constructor(private produtoServico: ProdutoServico, private router: Router) {

    }

    ngOnInit(): void {
        this.produto = new Produto();
    }

    public inputChange(files: FileList) {
        this.arquivoSelecionado = files.item(0);
        this.ativarEspera();
        this.produtoServico.enviarArquivo(this.arquivoSelecionado)
            .subscribe(nomeArquivo => {
                this.produto.nomeArquivo = nomeArquivo;
                this.desativarEspera();
            }, error => {
                console.log(error);
                this.desativarEspera();
            });
    }

    public cadastrar() {
        this.ativarEspera();
        this.produtoServico.cadastar(this.produto)
            .subscribe(produtoJson => {
                this.desativarEspera();
                this.router.navigate(['/pesquisar-produto'])
            }, error => {
                console.log(error);
                this.desativarEspera();
                this.menssagem = error.error;
            });
    }

    public ativarEspera() {
        this.ativar_spinner = true;
    }

    public desativarEspera() {
        this.ativar_spinner = false;
    }
}
