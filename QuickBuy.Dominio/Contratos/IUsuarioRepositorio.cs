using System;
using System.Collections.Generic;
using System.Text;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Dominio.Contratos
{
    public interface IUsuarioRepositorio : IBaseRepositorio<Usuario>
    {
        bool AutenticarUsuario(string email, string senha);
    }
}
