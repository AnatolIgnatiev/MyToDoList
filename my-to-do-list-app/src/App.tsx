import * as React from 'react';
import { FC, useState, useEffect, ChangeEvent } from 'react';
import Task from "./Components/Task";
import { ITask } from './Interfaces';
import './App.css';


const App: FC = () =>
{
    var dateFormat = require("dateformat");
    const [task, setTask] = useState<string>("");
    const [deadlineDate, setDeadline] = useState<Date>(dateFormat(new Date(), "yyyy-mm-dd"));//
    const [toDoList, setToDoList] = useState<ITask[]>([]);
    const [status, setStatus] = useState<string>("To Do");

    const postNewTask = async () =>
    {
        try
        {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Task: task,
                    DeadLine: deadlineDate,
                    Status: status,
                })
            };
            console.log("in postNewTask" + deadlineDate);
            return await fetch('https://localhost:44350/api/ToDoTasks', requestOptions);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    const getToDoTasks = () =>
    {
        console.log("get task invoked");
        fetch('https://localhost:44350/api/ToDoTasks')
            .then(response => response.json() as Promise<ITask[]>)
            .then(data =>
            {
                setToDoList(data)
            });
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    {
        console.log("in handleChange start" + deadlineDate);
        if (event.target.name === "task")
        {
            setTask(event.target.value);
        }
        else if (event.target.name === "status")
        {
            setStatus(event.target.value);
        }
        else
        {
            setDeadline(dateFormat(new Date(event.target.value), "yyyy-mm-dd"));
        }
        console.log("in handleChange finish" + deadlineDate);
    };
    const addTask = async () =>
    {
        console.log("in addTask" + deadlineDate);
        var result = await postNewTask();
        result.json().then(value =>
        {
            toDoList.push(value);
            setToDoList(toDoList);
            setTask("");
            setDeadline(dateFormat(deadlineDate, "yyyy-mm-dd"));
        });
    };

    useEffect(() => { getToDoTasks(); }, []);

    return (
        <div className="App">
            <div className="inputContainer">
                <input
                    type="text"
                    placeholder="Task"
                    name="task"
                    value={task}
                    onChange={handleChange}
                ></input>
                <input
                    type="text"
                    placeholder="Status"
                    name="status"
                    value={status}
                    onChange={handleChange}
                ></input>
                <input
                    type="date"
                    placeholder="Deadline"
                    name="deadline"
                    value={dateFormat(deadlineDate, "yyyy-mm-dd").toString()}
                    onChange={handleChange}
                ></input>
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="taskList">
                <table>
                    <tr>
                        <th>TASK</th>
                        <th>DEADLINE</th>
                        <th>STATUS</th>
                        <th></th>
                    </tr>
                    {toDoList.map((task: ITask, key: number) =>
                    {
                        return <Task key={key} task={task} />;
                    })}
                </table>
            </div>
        </div>
    );
}

export default App;
