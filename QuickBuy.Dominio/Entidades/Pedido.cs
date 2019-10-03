using System;
using System.Collections.Generic;
using System.Linq;
using QuickBuy.Dominio.ObjetoDeValor;

namespace QuickBuy.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        public int UsuarioId { get; set; }
        public DateTime DataPrevisaoEntrega { get; set; }
        public string CEP { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string EnderecoCompleto { get; set; }
        public string NumeroEndereco { get; set; }
        public int FormaPagamentoId { get; set; }
        public FormaPagamento FormaPagamento { get; set; }

        /// <summary>
        /// Pedido deve ter pelo menos um item de pedido ou muitos itens de pedido
        /// </summary>
        public ICollection<ItemPedido> ItensPedido { get; set; }

        public Usuario Usuario { get; set; }

        public override void Validacao()
        {
            LimparMensagemValidacao();

            if (!ItensPedido.Any())
                AdicionarMensagemValidacao("Pedido não pode ficar sem item de pedido");

            if (string.IsNullOrEmpty(CEP))
                AdicionarMensagemValidacao("CEP deve estar preenchido");

            if (FormaPagamentoId == 0)
                AdicionarMensagemValidacao("Não foi informado a forma de pagamento");
        }
    }
}
