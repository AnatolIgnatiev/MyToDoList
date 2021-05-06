import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useState, useRef, ChangeEvent, useImperativeHandle } from 'react';
import { ITask } from "../Interfaces";
import EditTask from './EditTask';

interface TaskProps
{
    task: ITask;
}
const Task = ({ task }: TaskProps) =>
{
    var dateFormat = require("dateformat");

    const [taskToEdit, setTaskToEdit] = useState<ITask>();
    const [editedTask, setEditedTask] = useState<string>(task.task);
    const [editedDeadlineDate, setEditedDeadline] = useState<Date>(task.deadLine);
    const [editedStatus, setEditedStatus] = useState<string>(task.status);
    const [message, setMessage] = useState<string>("");

    const deleteTask = (Id:number) =>
    {
        const requestOptions = {
            method: "Delete"
        }
        fetch("https://localhost:44350/api/ToDoTasks/" + Id, requestOptions)
            .then((response) => response.text())
    };
     
    const putEditedTask = () =>
    {
        const requestOptions = {
            method: "Put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Task: editedTask,
                DeadLine: editedDeadlineDate,
                Status: editedStatus,
                Id: taskToEdit.id
            })
        };
        fetch("https://localhost:44350/api/ToDoTasks/" + taskToEdit.id, requestOptions)
            .then((response) => response.text())
    };
    const handleSaveChanges = () =>
    {
        setTaskToEdit(task);
        putEditedTask();
        setMessage("Changes Saved");
    };

    const handleDeleteTask = (id: number) =>
    {
        deleteTask(id);
        setMessage("Deleted");
        editRef.current.close();//
    };


    const handleEditChange = (event: ChangeEvent<HTMLInputElement>): void =>
    {
        if (event.target.name === "task")
        {
            setEditedTask(event.target.value);
        }
        else if (event.target.name === "status")
        {
            setEditedStatus(event.target.value);
        }
        else
        {
            setEditedDeadline(dateFormat(new Date(event.target.value), "yyyy-mm-dd"));
        }
        const newTask: ITask = {
            id: task.id, task: editedTask, deadLine: editedDeadlineDate, status: editedStatus
        };
        setTaskToEdit(newTask);
    };

    const editRef = useRef(null);
    const openEdit = () =>
    {
        setMessage("");
        editRef.current.open();
    };
    return (
        <div className="task">
            <div className="content">
                <table>
                    <tbody>
                        <tr>
                            <td>{editedTask}</td>
                            <td>{dateFormat(new Date(editedDeadlineDate), "yyyy-mm-dd").toString()}</td>
                            <td>{editedStatus}</td>
                            <td><button onClick={openEdit}>Edit</button></td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <EditTask ref={editRef}>
                <h1>EditTask</h1>
                <h5>{message}</h5>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Task"
                                        name="task"
                                        value={editedTask}
                                        onChange={handleEditChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        placeholder="Deadline"
                                        name="deadline"
                                        value={dateFormat(editedDeadlineDate, "yyyy-mm-dd").toString()}
                                        onChange={handleEditChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Status"
                                        name="status"
                                        value={editedStatus}
                                        onChange={handleEditChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={() => {handleDeleteTask(task.id)}}>Delete Task</button>
                </div >
            </EditTask>
        </div>
    );
};
export default Task;


