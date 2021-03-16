using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace APIServer.Migrations
{
    public partial class AddContentDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PatricioPersonalAlbums",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoverImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalAlbums", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalArticles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalArticles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalPosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Link = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalPosts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalSongs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoundCloud = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Audio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AlbumId = table.Column<int>(type: "int", nullable: false),
                    ArticleId = table.Column<int>(type: "int", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalSongs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "PatricioPersonalAlbums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalSongs_PatricioPersonalArticles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "PatricioPersonalArticles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalMedia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: true),
                    ArticleId = table.Column<int>(type: "int", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalMedia_PatricioPersonalArticles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "PatricioPersonalArticles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalMedia_PatricioPersonalPosts_PostId",
                        column: x => x.PostId,
                        principalTable: "PatricioPersonalPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalTopSongs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rank = table.Column<int>(type: "int", nullable: true),
                    SongId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalTopSongs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalTopSongs_PatricioPersonalSongs_SongId",
                        column: x => x.SongId,
                        principalTable: "PatricioPersonalSongs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_ArticleId",
                table: "PatricioPersonalMedia",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_PostId",
                table: "PatricioPersonalMedia",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalSongs_AlbumId",
                table: "PatricioPersonalSongs",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalSongs_ArticleId",
                table: "PatricioPersonalSongs",
                column: "ArticleId",
                unique: true,
                filter: "[ArticleId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalTopSongs_SongId",
                table: "PatricioPersonalTopSongs",
                column: "SongId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatricioPersonalMedia");

            migrationBuilder.DropTable(
                name: "PatricioPersonalTopSongs");

            migrationBuilder.DropTable(
                name: "PatricioPersonalPosts");

            migrationBuilder.DropTable(
                name: "PatricioPersonalSongs");

            migrationBuilder.DropTable(
                name: "PatricioPersonalAlbums");

            migrationBuilder.DropTable(
                name: "PatricioPersonalArticles");
        }
    }
}
