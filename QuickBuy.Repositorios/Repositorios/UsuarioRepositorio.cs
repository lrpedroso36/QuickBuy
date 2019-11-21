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

        public Usuario AutenticarUsuario(string email, string senha)
        {
            return _quickBuyContext.Set<Usuario>().FirstOrDefault(x => x.Email.ToLower() == email.ToLower() && x.Senha.ToLower() == senha.ToLower());
        }

        public Usuario Obter(string email)
        {
            return _quickBuyContext.Set<Usuario>().FirstOrDefault(x => x.Email.ToLower() == email.ToLower());
        }
    }
}
