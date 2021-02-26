using Microsoft.EntityFrameworkCore.Migrations;

namespace APIServer.Migrations
{
    public partial class AddedFileProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalMedia_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalMedia_PatricioPersonalArticles_ArticleId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalMedia_PatricioPersonalSongs_SongId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalSongs");

            migrationBuilder.DropIndex(
                name: "IX_PatricioPersonalMedia_AlbumId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropIndex(
                name: "IX_PatricioPersonalMedia_ArticleId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropIndex(
                name: "IX_PatricioPersonalMedia_SongId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropColumn(
                name: "IsEvent",
                table: "PatricioPersonalPosts");

            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropColumn(
                name: "Preview",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropColumn(
                name: "SongId",
                table: "PatricioPersonalMedia");

            migrationBuilder.RenameColumn(
                name: "Heading",
                table: "PatricioPersonalPosts",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "EventUrl",
                table: "PatricioPersonalPosts",
                newName: "Link");

            migrationBuilder.RenameColumn(
                name: "Body",
                table: "PatricioPersonalPosts",
                newName: "Content");

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "PatricioPersonalSongs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AudioId",
                table: "PatricioPersonalSongs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CoverImageId",
                table: "PatricioPersonalAlbums",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalSongs_AudioId",
                table: "PatricioPersonalSongs",
                column: "AudioId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalAlbums_CoverImageId",
                table: "PatricioPersonalAlbums",
                column: "CoverImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalAlbums_PatricioPersonalMedia_CoverImageId",
                table: "PatricioPersonalAlbums",
                column: "CoverImageId",
                principalTable: "PatricioPersonalMedia",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalSongs",
                column: "AlbumId",
                principalTable: "PatricioPersonalAlbums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalMedia_AudioId",
                table: "PatricioPersonalSongs",
                column: "AudioId",
                principalTable: "PatricioPersonalMedia",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalAlbums_PatricioPersonalMedia_CoverImageId",
                table: "PatricioPersonalAlbums");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalSongs");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalMedia_AudioId",
                table: "PatricioPersonalSongs");

            migrationBuilder.DropIndex(
                name: "IX_PatricioPersonalSongs_AudioId",
                table: "PatricioPersonalSongs");

            migrationBuilder.DropIndex(
                name: "IX_PatricioPersonalAlbums_CoverImageId",
                table: "PatricioPersonalAlbums");

            migrationBuilder.DropColumn(
                name: "AudioId",
                table: "PatricioPersonalSongs");

            migrationBuilder.DropColumn(
                name: "CoverImageId",
                table: "PatricioPersonalAlbums");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "PatricioPersonalPosts",
                newName: "Heading");

            migrationBuilder.RenameColumn(
                name: "Link",
                table: "PatricioPersonalPosts",
                newName: "EventUrl");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "PatricioPersonalPosts",
                newName: "Body");

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "PatricioPersonalSongs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<bool>(
                name: "IsEvent",
                table: "PatricioPersonalPosts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "AlbumId",
                table: "PatricioPersonalMedia",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ArticleId",
                table: "PatricioPersonalMedia",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Preview",
                table: "PatricioPersonalMedia",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SongId",
                table: "PatricioPersonalMedia",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_AlbumId",
                table: "PatricioPersonalMedia",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_ArticleId",
                table: "PatricioPersonalMedia",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalMedia_SongId",
                table: "PatricioPersonalMedia",
                column: "SongId");

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalMedia_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalMedia",
                column: "AlbumId",
                principalTable: "PatricioPersonalAlbums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalMedia_PatricioPersonalArticles_ArticleId",
                table: "PatricioPersonalMedia",
                column: "ArticleId",
                principalTable: "PatricioPersonalArticles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalMedia_PatricioPersonalSongs_SongId",
                table: "PatricioPersonalMedia",
                column: "SongId",
                principalTable: "PatricioPersonalSongs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalSongs",
                column: "AlbumId",
                principalTable: "PatricioPersonalAlbums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
