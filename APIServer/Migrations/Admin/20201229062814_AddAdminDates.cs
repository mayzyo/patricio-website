using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace APIServer.Migrations.Admin
{
    public partial class AddAdminDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "PatricioPersonalUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "PatricioPersonalUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "PatricioPersonalEmails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "PatricioPersonalEmails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created",
                table: "PatricioPersonalUsers");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "PatricioPersonalUsers");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "PatricioPersonalEmails");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "PatricioPersonalEmails");
        }
    }
}
