using Microsoft.EntityFrameworkCore;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoDeValor;
using QuickBuy.Repositorios.Config;

namespace QuickBuy.Repositorios.Contexto
{
    public class QuickBuyContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<ItemPedido> ItensPedido { get; set; }
        public DbSet<FormaPagamento> FormaPagamentos { get; set; }

        public QuickBuyContext(DbContextOptions options) : base(options)
        {
        }

        public QuickBuyContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new FormaPagamentoConfiguration());
            modelBuilder.ApplyConfiguration(new ItemPedidoConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoConfiguration());
            modelBuilder.ApplyConfiguration(new ProdutoConfiguration());
            modelBuilder.ApplyConfiguration(new UsuarioConfiguration());

            modelBuilder.Entity<FormaPagamento>().HasData(new FormaPagamento()
            {
                Id = 1,
                Nome = "Boleto",
                Descricao = "Forma de pagamento Boleto"
            }, new FormaPagamento()
            {
                Id = 2,
                Nome = "Cartao de credito",
                Descricao = "Forma de pagamento Cartao de credito"
            }, new FormaPagamento()
            {
                Id = 3,
                Nome = "Transferencia",
                Descricao = "Forma de pagamento Transferencia"
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
