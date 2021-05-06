"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var EditTask_1 = require("./EditTask");
var Task = function (_a) {
    var task = _a.task;
    var dateFormat = require("dateformat");
    var _b = react_1.useState(), taskToEdit = _b[0], setTaskToEdit = _b[1];
    var _c = react_1.useState(task.task), editedTask = _c[0], setEditedTask = _c[1];
    var _d = react_1.useState(task.deadLine), editedDeadlineDate = _d[0], setEditedDeadline = _d[1];
    var _e = react_1.useState(task.status), editedStatus = _e[0], setEditedStatus = _e[1];
    var _f = react_1.useState(""), message = _f[0], setMessage = _f[1];
    var deleteTask = function (Id) {
        var requestOptions = {
            method: "Delete"
        };
        fetch("https://localhost:44350/api/ToDoTasks/" + Id, requestOptions)
            .then(function (response) { return response.text(); });
    };
    var putEditedTask = function () {
        var requestOptions = {
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
            .then(function (response) { return response.text(); });
    };
    var handleSaveChanges = function () {
        setTaskToEdit(task);
        putEditedTask();
        setMessage("Changes Saved");
    };
    var handleDeleteTask = function (id) {
        deleteTask(id);
        setMessage("Deleted");
        editRef.current.close(); //
    };
    var handleEditChange = function (event) {
        if (event.target.name === "task") {
            setEditedTask(event.target.value);
        }
        else if (event.target.name === "status") {
            setEditedStatus(event.target.value);
        }
        else {
            setEditedDeadline(dateFormat(new Date(event.target.value), "yyyy-mm-dd"));
        }
        var newTask = {
            id: task.id, task: editedTask, deadLine: editedDeadlineDate, status: editedStatus
        };
        setTaskToEdit(newTask);
    };
    var editRef = react_1.useRef(null);
    var openEdit = function () {
        setMessage("");
        editRef.current.open();
    };
    return (React.createElement("div", { className: "task" },
        React.createElement("div", { className: "content" },
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, editedTask),
                        React.createElement("td", null, dateFormat(new Date(editedDeadlineDate), "yyyy-mm-dd").toString()),
                        React.createElement("td", null, editedStatus),
                        React.createElement("td", null,
                            React.createElement("button", { onClick: openEdit }, "Edit")))))),
        React.createElement(EditTask_1.default, { ref: editRef },
            React.createElement("h1", null, "EditTask"),
            React.createElement("h5", null, message),
            React.createElement("div", null,
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", placeholder: "Task", name: "task", value: editedTask, onChange: handleEditChange })),
                            React.createElement("td", null,
                                React.createElement("input", { type: "date", placeholder: "Deadline", name: "deadline", value: dateFormat(editedDeadlineDate, "yyyy-mm-dd").toString(), onChange: handleEditChange })),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", placeholder: "Status", name: "status", value: editedStatus, onChange: handleEditChange }))))),
                React.createElement("button", { onClick: handleSaveChanges }, "Save Changes"),
                React.createElement("button", { onClick: function () { handleDeleteTask(task.id); } }, "Delete Task")))));
};
exports.default = Task;
//# sourceMappingURL=Task.js.map