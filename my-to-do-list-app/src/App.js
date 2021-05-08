"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var Task_1 = require("./Components/Task");
require("./App.css");
var App = function () {
    var dateFormat = require("dateformat");
    var _a = react_1.useState(""), task = _a[0], setTask = _a[1];
    var _b = react_1.useState(dateFormat(new Date(), "yyyy-mm-dd")), deadlineDate = _b[0], setDeadline = _b[1]; //
    var _c = react_1.useState([]), toDoList = _c[0], setToDoList = _c[1];
    var _d = react_1.useState("To Do"), status = _d[0], setStatus = _d[1];
    var postNewTask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestOptions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            Task: task,
                            DeadLine: deadlineDate,
                            Status: status,
                        })
                    };
                    console.log("in postNewTask" + deadlineDate);
                    return [4 /*yield*/, fetch('https://localhost:44350/api/ToDoTasks', requestOptions)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getToDoTasks = function () {
        console.log("get task invoked");
        fetch('https://localhost:44350/api/ToDoTasks')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setToDoList(data);
        });
    };
    var handleChange = function (event) {
        console.log("in handleChange start" + deadlineDate);
        if (event.target.name === "task") {
            setTask(event.target.value);
        }
        else if (event.target.name === "status") {
            setStatus(event.target.value);
        }
        else {
            setDeadline(dateFormat(new Date(event.target.value), "yyyy-mm-dd"));
        }
        console.log("in handleChange finish" + deadlineDate);
    };
    var addTask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("in addTask" + deadlineDate);
                    return [4 /*yield*/, postNewTask()];
                case 1:
                    result = _a.sent();
                    result.json().then(function (value) {
                        toDoList.push(value);
                        setToDoList(toDoList);
                        setTask("");
                        setDeadline(dateFormat(deadlineDate, "yyyy-mm-dd"));
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () { getToDoTasks(); }, []);
    return (React.createElement("div", { className: "App" },
        React.createElement("div", { className: "inputContainer" },
            React.createElement("input", { type: "text", placeholder: "Task", name: "task", value: task, onChange: handleChange }),
            React.createElement("input", { type: "text", placeholder: "Status", name: "status", value: status, onChange: handleChange }),
            React.createElement("input", { type: "date", placeholder: "Deadline", name: "deadline", value: dateFormat(deadlineDate, "yyyy-mm-dd").toString(), onChange: handleChange }),
            React.createElement("button", { onClick: addTask }, "Add Task")),
        React.createElement("div", { className: "taskList" },
            React.createElement("table", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "TASK"),
                    React.createElement("th", null, "DEADLINE"),
                    React.createElement("th", null, "STATUS"),
                    React.createElement("th", null)),
                toDoList.map(function (task, key) {
                    return React.createElement(Task_1.default, { key: key, task: task });
                })))));
};
exports.default = App;
//# sourceMappingURL=App.js.map