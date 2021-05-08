"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var react_1 = require("react");
var EditTask = react_1.forwardRef(function (props, ref) {
    var _a = react_1.useState(false), displayEdit = _a[0], setDisplayEdit = _a[1];
    react_1.useImperativeHandle(ref, function () {
        return {
            open: function () { return openEdit(); },
            close: function () { return closeEdit(); }
        };
    });
    var openEdit = function () {
        setDisplayEdit(true);
    };
    var closeEdit = function () {
        setDisplayEdit(false);
    };
    if (displayEdit) {
        return react_dom_1.createPortal(React.createElement("div", { className: 'edit-warpper' },
            React.createElement("div", { className: 'edit-content' },
                React.createElement("button", { onClick: closeEdit }, "X"),
                props.children)), document.getElementById("root"));
    }
    return null;
});
exports.default = EditTask;
//# sourceMappingURL=EditTask.js.map