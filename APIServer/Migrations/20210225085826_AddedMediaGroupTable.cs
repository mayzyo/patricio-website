using Microsoft.EntityFrameworkCore.Migrations;

namespace APIServer.Migrations
{
    public partial class AddedMediaGroupTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalMedia_PatricioPersonalPosts_PostId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalSongs");

            migrationBuilder.RenameColumn(
                name: "PostId",
                table: "PatricioPersonalMedia",
                newName: "MediaGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_PatricioPersonalMedia_PostId",
                table: "PatricioPersonalMedia",
                newName: "IX_PatricioPersonalMedia_MediaGroupId");

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "PatricioPersonalSongs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ImagesId",
                table: "PatricioPersonalPosts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MediaGroup",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaGroup", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PatricioPersonalPosts_ImagesId",
                table: "PatricioPersonalPosts",
                column: "ImagesId");

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalMedia_MediaGroup_MediaGroupId",
                table: "PatricioPersonalMedia",
                column: "MediaGroupId",
                principalTable: "MediaGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalPosts_MediaGroup_ImagesId",
                table: "PatricioPersonalPosts",
                column: "ImagesId",
                principalTable: "MediaGroup",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalMedia_MediaGroup_MediaGroupId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalPosts_MediaGroup_ImagesId",
                table: "PatricioPersonalPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalSongs");

            migrationBuilder.DropTable(
                name: "MediaGroup");

            migrationBuilder.DropIndex(
                name: "IX_PatricioPersonalPosts_ImagesId",
                table: "PatricioPersonalPosts");

            migrationBuilder.DropColumn(
                name: "ImagesId",
                table: "PatricioPersonalPosts");

            migrationBuilder.RenameColumn(
                name: "MediaGroupId",
                table: "PatricioPersonalMedia",
                newName: "PostId");

            migrationBuilder.RenameIndex(
                name: "IX_PatricioPersonalMedia_MediaGroupId",
                table: "PatricioPersonalMedia",
                newName: "IX_PatricioPersonalMedia_PostId");

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "PatricioPersonalSongs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalMedia_PatricioPersonalPosts_PostId",
                table: "PatricioPersonalMedia",
                column: "PostId",
                principalTable: "PatricioPersonalPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalSongs_PatricioPersonalAlbums_AlbumId",
                table: "PatricioPersonalSongs",
                column: "AlbumId",
                principalTable: "PatricioPersonalAlbums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
