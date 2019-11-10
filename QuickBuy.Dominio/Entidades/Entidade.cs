using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public abstract class Entidade
    {
        private List<string> _mensagemValidacao { get; set; }
        private List<string> MensagemValidacao
        {
            get
            {
                return _mensagemValidacao ?? (_mensagemValidacao = new List<string>());
            }
        }

        public void LimparMensagemValidacao()
        {
            MensagemValidacao.Clear();
        }

        public void AdicionarMensagemValidacao(string mensagem)
        {
            MensagemValidacao.Add(mensagem);
        }

        public string ObterMensagemValidacao()
        {
            return string.Join("; ", MensagemValidacao);
        }

        public abstract void Validacao();

        public bool Valido
        {
            get { return !MensagemValidacao.Any(); }
        }
    }
}
