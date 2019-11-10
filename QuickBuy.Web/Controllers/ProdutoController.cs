using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProdutoController : Controller
    {
        private readonly IProdutoRepositorio _produtoRepositorio;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProdutoController(IProdutoRepositorio produtoRepositorio,
                                 IHostingEnvironment hostingEnvironment,
                                 IHttpContextAccessor httpContextAccessor)
        {
            _produtoRepositorio = produtoRepositorio;
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var produtos = _produtoRepositorio.ObterTodos();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Produto produto)
        {
            try
            {
                produto.Validacao();

                if (!produto.Valido)
                {
                    return BadRequest(produto.ObterMensagemValidacao());
                }

                _produtoRepositorio.Adicionar(produto);
                return Created("api/produto", produto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("enviarArquivo")]
        public IActionResult EnviarArquivo()
        {
            try
            {
                var formFile = _httpContextAccessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                var nomeArquivo = formFile.FileName;
                var extensao = nomeArquivo.Split(".").Last();
                var novoNomeArquivo = $"{Guid.NewGuid()}.{extensao}";
                var pastaArquivos = $"{_hostingEnvironment.WebRootPath}/arquivos/";
                var nomeCompleto = $"{pastaArquivos}{novoNomeArquivo}";

                using (var stream = new FileStream(nomeCompleto, FileMode.Create))
                {
                    formFile.CopyTo(stream);
                }

                return Json(novoNomeArquivo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
