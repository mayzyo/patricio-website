using Microsoft.EntityFrameworkCore.Migrations;

namespace APIServer.Migrations
{
    public partial class RefactoredMediaGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalMedia_MediaGroup_MediaGroupId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalPosts_MediaGroup_ImagesId",
                table: "PatricioPersonalPosts");

            migrationBuilder.DropTable(
                name: "MediaGroup");

            migrationBuilder.DropIndex(
                name: "IX_PatricioPersonalMedia_MediaGroupId",
                table: "PatricioPersonalMedia");

            migrationBuilder.DropColumn(
                name: "MediaGroupId",
                table: "PatricioPersonalMedia");

            migrationBuilder.RenameColumn(
                name: "ImagesId",
                table: "PatricioPersonalPosts",
                newName: "GalleryId");

            migrationBuilder.RenameIndex(
                name: "IX_PatricioPersonalPosts_ImagesId",
                table: "PatricioPersonalPosts",
                newName: "IX_PatricioPersonalPosts_GalleryId");

            migrationBuilder.CreateTable(
                name: "PatricioPersonalGallery",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatricioPersonalGallery", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GalleryMedia",
                columns: table => new
                {
                    GalleryId = table.Column<int>(type: "int", nullable: false),
                    MediaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GalleryMedia", x => new { x.GalleryId, x.MediaId });
                    table.ForeignKey(
                        name: "FK_GalleryMedia_PatricioPersonalGallery_GalleryId",
                        column: x => x.GalleryId,
                        principalTable: "PatricioPersonalGallery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GalleryMedia_PatricioPersonalMedia_MediaId",
                        column: x => x.MediaId,
                        principalTable: "PatricioPersonalMedia",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GalleryMedia_MediaId",
                table: "GalleryMedia",
                column: "MediaId");

            migrationBuilder.AddForeignKey(
                name: "FK_PatricioPersonalPosts_PatricioPersonalGallery_GalleryId",
                table: "PatricioPersonalPosts",
                column: "GalleryId",
                principalTable: "PatricioPersonalGallery",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatricioPersonalPosts_PatricioPersonalGallery_GalleryId",
                table: "PatricioPersonalPosts");

            migrationBuilder.DropTable(
                name: "GalleryMedia");

            migrationBuilder.DropTable(
                name: "PatricioPersonalGallery");

            migrationBuilder.RenameColumn(
                name: "GalleryId",
                table: "PatricioPersonalPosts",
                newName: "ImagesId");

            migrationBuilder.RenameIndex(
                name: "IX_PatricioPersonalPosts_GalleryId",
                table: "PatricioPersonalPosts",
                newName: "IX_PatricioPersonalPosts_ImagesId");

            migrationBuilder.AddColumn<int>(
                name: "MediaGroupId",
                table: "PatricioPersonalMedia",
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
                name: "IX_PatricioPersonalMedia_MediaGroupId",
                table: "PatricioPersonalMedia",
                column: "MediaGroupId");

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
        }
    }
}
