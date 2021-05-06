using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyToDoList.Controllers;
using MyToDoList.Data;
using MyToDoList.Models;
using NSubstitute;
using NUnit.Framework;

namespace MyToDoListTest
{
    class ToDoTaskControllerTests
    {

        [Test]
        public void GetToDoTask_ActoinResultNotNull()
        {
            // Arrange
            var context = Substitute.For<IMyToDoListContext>();
            var dbTaskList = new List<ToDoTask>
            {
                new ToDoTask { ID = 1 },
                new ToDoTask { ID = 2 },
                new ToDoTask { ID = 3 }

            };
            var dbSet = GetDbSet(dbTaskList);
            context.ToDoTask.Returns(dbSet);
            ToDoTasksController controller = new ToDoTasksController(context);
            // Act
            var result = controller.GetToDoTask().Value.ToList();
            // Assert
            Assert.AreEqual(dbTaskList, result);
        }

        [Test]
        [TestCase(true)]
        [TestCase(false)]
        public void GetToDoTask_IfTaskExists_ReturnToDoTask_ElseReturNotFoundResult(bool taskExists)
        {
            // Arrange
            var context = Substitute.For<IMyToDoListContext>();
            var dbTask = new ToDoTask { ID = 1 };
            var dbSet = GetDbSet(new List<ToDoTask> { dbTask });
            context.ToDoTask.Returns(dbSet);
            ToDoTasksController controller = new ToDoTasksController(context);
            // Act 
            if (taskExists)
            {
                context.ToDoTask.FindAsync(dbTask.ID).Returns(dbTask);
                var result = controller.GetToDoTask(dbTask.ID).Result.Value;
                // Assert
                Assert.AreEqual(dbTask, result);
            }
            else
            {
                var result = (controller.GetToDoTask(dbTask.ID).Result.Result as StatusCodeResult)?.StatusCode;
                // Assert
                Assert.AreEqual(404, result);
            }
        }

        [Test]
        public async Task PutToDoTask_IfToDoTaskIDNotEqalId_ReturnsBadReqestResult()
        {
            var context = Substitute.For<IMyToDoListContext>();
            var dbTask = new ToDoTask { ID = 1 };
            var uiTask = new ToDoTask { ID = dbTask.ID };
            var dbSet = GetDbSet(new List<ToDoTask>());
            context.ToDoTask.Returns(dbSet);
            ToDoTasksController controller = new ToDoTasksController(context);
            // Act
            var result = (await controller.PutToDoTask(dbTask.ID + 1, uiTask) as StatusCodeResult)?.StatusCode;
            // Assert
            Assert.AreEqual(400, result);
        }

        [Test]
        public async Task PutToDoTask_IfValidPramsPassed_UpdatesDatabase()
        {
            // Arrange
            var context = Substitute.For<IMyToDoListContext>();
            ToDoTasksController controller = new ToDoTasksController(context);
            var dbTask = new ToDoTask { ID = 1 };
            var uiTask = new ToDoTask { ID = dbTask.ID, Status = "done" };
            var dbSet = GetDbSet(new List<ToDoTask> { dbTask });
            context.ToDoTask.Returns(dbSet);
            // Act
            await controller.PutToDoTask(dbTask.ID, uiTask);
            // Assert
            await context.Received().SaveChangesAsync();
            Assert.AreEqual(dbTask.Status, uiTask.Status);
        }

        [Test]
        [TestCase(true)]
        [TestCase(false)]
        public async Task PutToDoTask_IfTaskExists_ReturnsNotFoundResult_ElseReturnNoContentResult(bool toDoTaskExists)
        {
            // Arrange
            var context = Substitute.For<IMyToDoListContext>();
            var dbTask = new ToDoTask { ID = 1 };
            var uiTask = new ToDoTask { ID = dbTask.ID };
            var dbSet = GetDbSet(new List<ToDoTask> { dbTask });
            context.ToDoTask.Returns(dbSet);
            ToDoTasksController controller = new ToDoTasksController(context);
            if (toDoTaskExists)
            {
                // Act
                var result = (await controller.PutToDoTask(dbTask.ID, uiTask) as StatusCodeResult)?.StatusCode;
                // Assert
                Assert.AreEqual(204, result);
            }
            else
            {
                uiTask.ID = 2;
                // Act
                var result = (await controller.PutToDoTask(uiTask.ID, uiTask) as StatusCodeResult)?.StatusCode;
                // Assert
                Assert.AreEqual(404, result);
            }
        }

        [Test]
        public void PostToDoTask_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var context = Substitute.For<IMyToDoListContext>();
            ToDoTasksController controller = new ToDoTasksController(context);
            var dbTask = new ToDoTask { ID = 1 };
            var uiTask = new ToDoTask { ID = dbTask.ID, Status = "done" };
            var dbSet = GetDbSet(new List<ToDoTask> { dbTask });
            context.ToDoTask.Returns(dbSet);
            // Act
            var result = (controller.PostToDoTask(uiTask).Result.Result as CreatedAtActionResult).StatusCode;
            // Assert
            Assert.AreEqual(201, result);
        }
        [Test]
        [TestCase(true)]
        [TestCase(false)]
        public void DeleteToDoTask_IfTaskExists_ReturnToDoTask_ElseReturnNotFoundResult(bool toDoTaskExists)
        {
            // Arrange
            var context = Substitute.For<IMyToDoListContext>();
            ToDoTasksController controller = new ToDoTasksController(context);
            var dbTask = new ToDoTask { ID = 1 };
            var uiTask = new ToDoTask { ID = dbTask.ID};
            var dbSet = GetDbSet(new List<ToDoTask> { dbTask });
            context.ToDoTask.Returns(dbSet);
            if (toDoTaskExists)
            {
                context.ToDoTask.FindAsync(uiTask.ID).Returns(dbTask);
                //Act
                var result = controller.DeleteToDoTask(uiTask.ID).Result.Value;
                // Assert
                Assert.AreEqual(dbTask, result);
                
            }
            else
            {
                uiTask.ID = 2;
                // Act
                var result = (controller.DeleteToDoTask(uiTask.ID).Result.Result as StatusCodeResult)?.StatusCode;
                // Assert
                Assert.AreEqual(404, result);
            }
        }

        public DbSet<T> GetDbSet<T>(IEnumerable<T> data = null) where T : class
        {
            var dbSet = Substitute.For<DbSet<T>, IQueryable<T>>();

            if (data != null)
            {
                var queryable = data.AsQueryable();
                ((IQueryable<T>)dbSet).Provider.Returns(queryable.Provider);
                ((IQueryable<T>)dbSet).Expression.Returns(queryable.Expression);
                ((IQueryable<T>)dbSet).ElementType.Returns(queryable.ElementType);
                ((IQueryable<T>)dbSet).GetEnumerator().Returns(queryable.GetEnumerator());
                ((IQueryable<T>)dbSet).AsNoTracking().Returns(queryable);
            }
            return dbSet;
        }
    }

}
