import { Component, OnInit } from '@angular/core'
import { ProdutoServico } from '../../../servicos/produto/produto.servico';
import { Produto } from '../../../model/produto';
import { Router } from '@angular/router';
import { LojaCarrinhoCompras } from '../carrinho-compras/loja.carrinho.compras';

@Component({
    selector: "loja-app-produto",
    templateUrl: "./loja.produto.component.html",
    styleUrls: ["./loja.produto.component.css"]
})
export class LojaProdutoComponent implements OnInit {
    public produto: Produto;
    public carrinhoCompra: LojaCarrinhoCompras;

    ngOnInit(): void {
        this.carrinhoCompra = new LojaCarrinhoCompras();
        var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');

        if (produtoDetalhe) {
            this.produto = JSON.parse(produtoDetalhe);
        }
    }

    constructor(private produtoServico: ProdutoServico, private router: Router) {

    }

    public comprar() {
        this.carrinhoCompra.adicionar(this.produto);
        this.router.navigate(['/loja-efetivar'])
    }
}

