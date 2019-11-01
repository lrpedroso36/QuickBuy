using System.Linq;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorios.Contexto;

namespace QuickBuy.Repositorios.Repositorios
{
    public class UsuarioRepositorio : BaseRepositorio<Usuario>, IUsuarioRepositorio
    {
        private QuickBuyContext _quickBuyContext;

        public UsuarioRepositorio(QuickBuyContext quickBuyContext)
            : base(quickBuyContext)
        {
            _quickBuyContext = quickBuyContext;
        }

        public bool AutenticarUsuario(string email, string senha)
        {
            return _quickBuyContext.Set<Usuario>().Any(x => x.Email.ToLower() == email.ToLower() && x.Senha.ToLower() == senha.ToLower());
        }
    }
}
