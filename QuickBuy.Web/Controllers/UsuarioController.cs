using System;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[Controller]")]
    public class UsuarioController : Controller
    {
        [HttpPost]
        public IActionResult Post()
        {
            try
            {
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
                if(usuario.Email == "leandro@teste.com.br" && usuario.Senha == "abc123")
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