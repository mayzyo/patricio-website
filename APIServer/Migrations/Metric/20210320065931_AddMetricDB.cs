using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace APIServer.Migrations.Metric
{
    public partial class AddMetricDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PatricioPersonalUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IpAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalEmails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Template = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsSuccess = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalEmails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalEmails_PatricioPersonalUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "PatricioPersonalUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalEmails_UserId",
                table: "PatricioPersonalEmails",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatricioPersonalEmails");

            migrationBuilder.DropTable(
                name: "PatricioPersonalUsers");
        }
    }
}
