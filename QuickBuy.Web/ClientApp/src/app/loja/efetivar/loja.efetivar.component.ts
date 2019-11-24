import { Component, OnInit } from "@angular/core";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras";
import { Produto } from "../../../model/produto";
import { Router } from "@angular/router";
import { Pedido } from "../../../model/pedido";
import { UsuarioServico } from "../../../servicos/usuario/usuario.servico";
import { ItemPedido } from "../../../model/itemPedido";
import { PedidoServico } from "../../../servicos/pedido/pedido.servico";

@Component({
    selector: "loja-efetivar",
    templateUrl: "./loja.efetivar.component.html",
    styleUrls: ["./loja.efetivar.component.css"]
})
export class LojaEfetivarComponent implements OnInit {
    public carrinhoCompras: LojaCarrinhoCompras;
    public produtos: Produto[];
    public total: number;

    ngOnInit(): void {
        this.carrinhoCompras = new LojaCarrinhoCompras();
        this.produtos = this.carrinhoCompras.obterProdutos();
        this.atualizarTotal();
    }

    constructor(private router: Router, private usuarioServico: UsuarioServico, private pedidoServico: PedidoServico) {

    }

    public atualizarPreco(produto: Produto, quantidade: number) {
        if (!produto.precoOriginal) {
            produto.precoOriginal = produto.preco;
        }

        if (quantidade <= 0) {
            quantidade = 1;
            produto.quantidade = quantidade;
        }

        produto.preco = produto.precoOriginal * quantidade;
        this.carrinhoCompras.atualizar(this.produtos);
        this.atualizarTotal();
    }
      
    public remover(produto: Produto) {
        this.carrinhoCompras.removerProduto(produto);
        this.produtos = this.carrinhoCompras.obterProdutos();
        this.atualizarTotal();

        if (this.produtos.length == 0 || this.produtos == undefined) {
            this.router.navigate(['/']);
        }
    }

    public atualizarTotal() {
        this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
    }

    public finalizarCompra() {
        let pedido = this.criarPedido();
        this.pedidoServico.efetivarCompra(pedido)
            .subscribe(pedidoId => {
                console.log(pedidoId);    
                sessionStorage.setItem("pedidoId", pedidoId.toString());
                this.produtos = [];
                this.carrinhoCompras.limparCarrinhoCompras();
                this.router.navigate(['compra-realizada-sucesso']);
              }, e => {
                console.log(e.error);
            });
    }

    public criarPedido(): Pedido {
        let pedido = new Pedido();
        pedido.usuarioId = this.usuarioServico.usuario.id;
        pedido.cep = "09220000";
        pedido.cidade = "Santo André";
        pedido.estado = "Sao Paulo";
        pedido.enderecoCompleto = "Av Varsovia, Vila Metalurgica";
        pedido.dataPrevisaoEntrega = new Date();
        pedido.formaPagamentoId = 1;
        pedido.numeroEndereco = "850";

        this.produtos = this.carrinhoCompras.obterProdutos();

        for (let produto of this.produtos) {
            let itemPedido = new ItemPedido();
            itemPedido.produtoId = produto.id;

            if (!produto.quantidade) {
                produto.quantidade = 1;
            }

            itemPedido.quantidade = produto.quantidade;
            pedido.itensPedido.push(itemPedido);
        }


        return pedido;
    }
}