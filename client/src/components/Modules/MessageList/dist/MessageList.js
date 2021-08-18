"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var moment_1 = require("moment");
var MessageList_styles_1 = require("./MessageList.styles");
var auth_1 = require("api/auth");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var MessageList = function (_a) {
    var messages = _a.messages;
    // Styles
    var styles = MessageList_styles_1.useStyles();
    // Refs
    var messagesEndRef = react_1.useRef(null);
    // Custom methods
    var displayTime = function (timestamp) {
        var timestampFormatted = moment_1["default"](timestamp).format("DD-MM-YYYY");
        var nowFormatted = moment_1["default"]().format("DD-MM-YYYY");
        if (timestampFormatted !== nowFormatted) {
            return moment_1["default"](timestamp).format("DD-MM-YYYY kk:mm");
        }
        return moment_1["default"](timestamp).format("kk:mm");
    };
    var scrollToBottom = function () {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    };
    // Effects
    react_1.useEffect(function () {
        scrollToBottom();
    }, [messages]);
    return (React.createElement(Flex_1["default"], { className: styles.container, direction: Flex_d_1.FlexDirectionEnum.Vertical, justify: Flex_d_1.FlexJustifyEnum.End }, messages.length > 0 ? (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Vertical },
        messages.map(function (m, k) { return (React.createElement(Flex_1["default"], { key: k, direction: Flex_d_1.FlexDirectionEnum.Vertical, fullWidth: true },
            React.createElement(core_1.ListItemText, { className: (auth_1["default"].getUserId() === m.sender.id ? styles.senderMessage : styles.receiverMessage) + " " + styles.message },
                React.createElement(core_1.Typography, { component: 'pre' }, m.message)),
            React.createElement(core_1.ListItemText, { secondaryTypographyProps: { className: styles.timestamp }, secondary: displayTime(m.created_at) }))); }),
        React.createElement("div", { ref: messagesEndRef }))) : (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, justify: Flex_d_1.FlexJustifyEnum.Center, align: Flex_d_1.FlexAlignEnum.Center, height: '100%' },
        React.createElement("p", null, "Vous n'avez pas commenc\u00E9 de discussion avec cet utilisateur.")))));
};
exports["default"] = MessageList;
