using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MyToDoList.Models;

namespace MyToDoList.Data
{
    public class MyToDoListContext : DbContext, IMyToDoListContext
    {

        public MyToDoListContext (DbContextOptions<MyToDoListContext> options)
            : base(options)
        {
        }

        
        public DbSet<ToDoTask> ToDoTask { get; set; }
        
    }
}
