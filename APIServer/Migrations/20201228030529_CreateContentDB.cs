using Microsoft.EntityFrameworkCore.Migrations;

namespace APIServer.Migrations
{
    public partial class CreateContentDB : Migration
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
                    Genre = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalAlbums", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalPosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Heading = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsEvent = table.Column<bool>(type: "bit", nullable: false),
                    EventUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    AlbumId = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoundCloud = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsHighlight = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalSongs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "PatricioPersonalAlbums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalArticles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SongId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalArticles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalArticles_PatricioPersonalSongs_SongId",
                        column: x => x.SongId,
                        principalTable: "PatricioPersonalSongs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PatricioPersonalMedia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Preview = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: false),
                    SongId = table.Column<int>(type: "int", nullable: true),
                    PostId = table.Column<int>(type: "int", nullable: true),
                    ArticleId = table.Column<int>(type: "int", nullable: true),
                    AlbumId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatricioPersonalMedia_PatricioPersonalAlbums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "PatricioPersonalAlbums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    table.ForeignKey(
                        name: "FK_PatricioPersonalMedia_PatricioPersonalSongs_SongId",
                        column: x => x.SongId,
                        principalTable: "PatricioPersonalSongs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalArticles_SongId",
                table: "PatricioPersonalArticles",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_AlbumId",
                table: "PatricioPersonalMedia",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_ArticleId",
                table: "PatricioPersonalMedia",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_PostId",
                table: "PatricioPersonalMedia",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_SongId",
                table: "PatricioPersonalMedia",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalSongs_AlbumId",
                table: "PatricioPersonalSongs",
                column: "AlbumId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatricioPersonalMedia");

            migrationBuilder.DropTable(
                name: "PatricioPersonalArticles");

            migrationBuilder.DropTable(
                name: "PatricioPersonalPosts");

            migrationBuilder.DropTable(
                name: "PatricioPersonalSongs");

            migrationBuilder.DropTable(
                name: "PatricioPersonalAlbums");
        }
    }
}
