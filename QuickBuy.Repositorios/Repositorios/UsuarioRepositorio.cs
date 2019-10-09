using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorios.Contexto;

namespace QuickBuy.Repositorios.Repositorios
{
    public class UsuarioRepositorio : BaseRepositorio<Usuario>, IUsuarioRepositorio
    {
        public UsuarioRepositorio(QuickBuyContext quickBuyContext) 
            : base(quickBuyContext)
        {
        }
    }
}
