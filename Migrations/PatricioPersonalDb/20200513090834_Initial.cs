using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PatricioPersonal.Migrations.PatricioPersonalDb
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PatricioPersonalArticles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalArticles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalMoments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Thumbnail = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    ImageKey = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalMoments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalUpdates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Link = table.Column<string>(nullable: true),
                    Thumbnail = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalUpdates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalMusics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: false),
                    Genre = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Thumbnail = table.Column<string>(nullable: true),
                    SoundCloud = table.Column<string>(nullable: true),
                    CoverKey = table.Column<string>(nullable: true),
                    AudioKey = table.Column<string>(nullable: true),
                    Favourite = table.Column<bool>(nullable: false),
                    ArticleId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalMusics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalMusics_PatricioPersonalArticles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "PatricioPersonalArticles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMusics_ArticleId",
                table: "PatricioPersonalMusics",
                column: "ArticleId",
                unique: true,
                filter: "[ArticleId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatricioPersonalMoments");

            migrationBuilder.DropTable(
                name: "PatricioPersonalMusics");

            migrationBuilder.DropTable(
                name: "PatricioPersonalUpdates");

            migrationBuilder.DropTable(
                name: "PatricioPersonalArticles");
        }
    }
}
