using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorios.Contexto;

namespace QuickBuy.Repositorios.Repositorios
{
    public class ProdutoRepositorio : BaseRepositorio<Produto>, IProdutoRepositorio
    {
        public ProdutoRepositorio(QuickBuyContext quickBuyContext)
            : base(quickBuyContext)
        {
        }
    }
}
