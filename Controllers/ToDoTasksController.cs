using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyToDoList.Data;
using MyToDoList.Models;

namespace MyToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoTasksController : ControllerBase
    {
        private readonly IMyToDoListContext _context;

        public ToDoTasksController(IMyToDoListContext context)
        {
            _context = context;
        }


        // GET: api/ToDoTasks
        [HttpGet]
        public ActionResult<IEnumerable<ToDoTask>> GetToDoTask()
        {
            return _context.ToDoTask.ToList();
        }

        // GET: api/ToDoTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoTask>> GetToDoTask(int id)
        {
            var toDoTask = await _context.ToDoTask.FindAsync(id);

            if (toDoTask == null)
            {
                return NotFound();
            }
            return toDoTask;
        }

        // PUT: api/ToDoTasks/5

        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoTask(int id, ToDoTask toDoTask)
        {
            if (id != toDoTask.ID) 
            {
                return BadRequest();
            }
            var task = _context.ToDoTask.FirstOrDefault(task => task.ID == id);
            if (task != null) 
            {
                task.Status = toDoTask.Status;
                task.Task = toDoTask.Task;
                task.DeadLine = toDoTask.DeadLine;
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/ToDoTasks

        [HttpPost]
        public async Task<ActionResult<ToDoTask>> PostToDoTask(ToDoTask toDoTask)
        {
            _context.ToDoTask.Add(toDoTask);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetToDoTask", new { id = toDoTask.ID }, toDoTask); 
        }

        // DELETE: api/ToDoTasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ToDoTask>> DeleteToDoTask(int id)
        {
            var toDoTask = await _context.ToDoTask.FindAsync(id);
            if (toDoTask == null)
            {
                return NotFound();
            }

            _context.ToDoTask.Remove(toDoTask);
            await _context.SaveChangesAsync();

            return toDoTask;
        }
    }
}
