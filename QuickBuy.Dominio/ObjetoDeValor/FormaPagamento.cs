using System;
using System.Collections.Generic;
using System.Text;
using QuickBuy.Dominio.Enum;

namespace QuickBuy.Dominio.ObjetoDeValor
{
    public class FormaPagamento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public bool Boleto
        {
            get { return Id == (int)TipoFormaPagamento.Boleto; }
        }

        public bool CartaoCredito
        {
            get { return Id == (int)TipoFormaPagamento.CartaoCredito; }
        }

        public bool Tranferencia
        {
            get { return Id == (int)TipoFormaPagamento.Transferencia; }
        }

        public bool NaoDefinido
        {
            get { return Id == (int)TipoFormaPagamento.NaoDefinido; }
        }
    }
}
