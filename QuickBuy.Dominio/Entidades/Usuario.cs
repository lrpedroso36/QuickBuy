﻿using System.Collections.Generic;

namespace QuickBuy.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public bool Administrador { get; set; }
        public virtual ICollection<Pedido> Pedidos { get; set; }

        public override void Validacao()
        {
            LimparMensagemValidacao();

            if (string.IsNullOrEmpty(Email))
                AdicionarMensagemValidacao("Email não foi informado");

            if (string.IsNullOrEmpty(Senha))
                AdicionarMensagemValidacao("Senha não foi informado");
        }
    }
}
