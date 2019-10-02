﻿using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Produto : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }

        public override void Validacao()
        {
            LimparMensagemValidacao();

            if (string.IsNullOrEmpty(Nome))
                AdicionarMensagemValidacao("Nome do produto não foi informado");

            if (string.IsNullOrEmpty(Descricao))
                AdicionarMensagemValidacao("Descrição não foi informado");
        }
    }
}
