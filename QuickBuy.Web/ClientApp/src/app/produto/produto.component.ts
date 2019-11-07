import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../model/produto";

@Component({
    selector: "app-produto",
    template: "./produto.component.html",
    styleUrls: ["./produto.component.css"]
})

export class ProdutoComponent implements OnInit {
    private produto: Produto;

    constructor(private produtoServico: ProdutoServico) {

    }

    ngOnInit(): void {
        this.produto = new Produto();
    }

    public cadastrar() {
        this.produtoServico.cadastar(this.produto)
            .subscribe(
                produtoJson => {
                    console.log(produtoJson);
                },
                e => {
                    console.log(e);
                }
            );
    }
}
