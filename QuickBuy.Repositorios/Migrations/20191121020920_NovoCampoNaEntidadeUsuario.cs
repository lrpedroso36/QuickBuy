﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorios.Migrations
{
    public partial class NovoCampoNaEntidadeUsuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Administrador",
                table: "Usuarios",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Administrador",
                table: "Usuarios");
        }
    }
}
