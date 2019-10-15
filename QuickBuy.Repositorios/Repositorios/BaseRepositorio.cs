using System.Collections.Generic;
using System.Linq;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorios.Contexto;

namespace QuickBuy.Repositorios.Repositorios
{
    public class BaseRepositorio<TEntity> : IBaseRepositorio<TEntity> where TEntity : class
    {
        protected readonly QuickBuyContext QuickBuyContext;

        public BaseRepositorio(QuickBuyContext quickBuyContext)
        {
            QuickBuyContext = quickBuyContext;
        }

        public void Adicionar(TEntity entity)
        {
            QuickBuyContext.Set<TEntity>().Add(entity);
            QuickBuyContext.SaveChanges();
        }

        public void Atualizar(TEntity entity)
        {
            QuickBuyContext.Set<TEntity>().Update(entity);
            QuickBuyContext.SaveChanges();
        }

        public void Deletar(TEntity entity)
        {
            QuickBuyContext.Remove(entity);
            QuickBuyContext.SaveChanges();
        }

        public TEntity ObterPorId(int id)
        {
            return QuickBuyContext.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> ObterTodos()
        {
            return QuickBuyContext.Set<TEntity>().ToList();
        }

        public void Dispose()
        {
            QuickBuyContext.Dispose();
        }
    }
}
