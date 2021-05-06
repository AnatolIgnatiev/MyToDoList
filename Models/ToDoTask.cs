using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyToDoList.Models
{
    public class ToDoTask
    {
        public int ID { get; set; }
        public string Task { get; set; }
        public DateTime DeadLine { get; set; }
        public string Status { get; set; }
    }
}
