using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorios.Contexto;

namespace QuickBuy.Repositorios.Repositorios
{
    public class PedidoRepositorio : BaseRepositorio<Pedido>, IPedidoRepositorio
    {
        public PedidoRepositorio(QuickBuyContext quickBuyContext) 
            : base(quickBuyContext)
        {
        }
    }
}
