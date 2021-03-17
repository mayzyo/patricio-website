using APIServer.Areas.Content.Controllers;
using APIServer.Areas.Content.Data;
using APIServer.Areas.Content.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace APIServer.Tests
{
    public class SongsControllerTests
    {
        [Fact]
        public async void GetAllTest()
        {
            var options = new DbContextOptionsBuilder<ContentContext>()
                .UseInMemoryDatabase(databaseName: "destinesiahub_db")
                .Options;

            // Insert seed data into the database using one instance of the context
            using (var context = new ContentContext(options))
            {
                context.PatricioPersonalSongs.Add(
                    new Song()
                    {
                        Id = 1,
                        Title = "Song1"
                    }
                );
                context.SaveChanges();
            }

            // Use a clean instance of the context to run the test
            using (var context = new ContentContext(options))
            {
                var controller = new SongsController(context);
                // Act
                var result = await controller.GetSongs();
                // Assert
                var viewResult = Assert.IsType<ActionResult<IEnumerable<Song>>>(result);
                var model = Assert.IsAssignableFrom<List<Song>>(viewResult.Value);
            }
        }

        //[Fact]
        //public async void TestAdd()
        //{
        //    var mockRepo = new Mock<MusicContext>();
        //    mockRepo.Setup(repo => repo.PatricioPersonalSongs)
        //        .Returns(GetTestSongs().AsQueryable().BuildMockDbSet().Object);

        //    var controller = new SongsController(mockRepo.Object);
        //    // Act
        //    var result = await controller.GetSongs();
        //    // Assert
        //    var viewResult = Assert.IsType<ActionResult<IEnumerable<Song>>>(result);
        //    var model = Assert.IsAssignableFrom<List<Song>>(viewResult.Result);
        //    Assert.Equal(1, model.Count);
        //}

        //[Fact]
        //public async void TestAdd()
        //{
        //    // Arrange
        //    var mockRepo = new Mock<MusicContext>();
        //    mockRepo.Setup(repo => repo.PatricioPersonalSongs)
        //        .Returns((DbSet<Song>)GetTestSongs());
        //    var controller = new SongsController(mockRepo.Object);
        //    // Act
        //    var result = await controller.GetSongs();
        //    // Assert
        //    var viewResult = Assert.IsType<ActionResult<IEnumerable<Song>>>(result);
        //    var model = Assert.IsAssignableFrom<List<Song>>(viewResult.Result);
        //    Assert.Equal(2, model.Count);
        //}

        //private IEnumerable<Song> GetTestSongs()
        //{
        //    return new List<Song>()
        //    {
        //        new Song()
        //        {
        //            Id = 1,
        //            Title = "Song1",
        //            IsHighlight = true
        //        }
        //    };
        //}
    }
}
