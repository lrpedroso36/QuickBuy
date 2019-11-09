using System;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[Controller]")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;

        public UsuarioController(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioCadastro = _usuarioRepositorio.Obter(usuario.Email);

                if(usuarioCadastro != null)
                {
                    return BadRequest("Usuario já cadastrado no sistema.");
                }

                _usuarioRepositorio.Adicionar(usuario);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("verificar")]
        public IActionResult VerificarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioAutenticado = _usuarioRepositorio.AutenticarUsuario(usuario.Email, usuario.Senha);

                if (usuarioAutenticado)
                {
                    return Ok(usuario);
                }

                return NotFound("Usuario ou senha inválido!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}