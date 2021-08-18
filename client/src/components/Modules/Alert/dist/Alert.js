"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var Alert_styles_1 = require("./Alert.styles");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var AlertContext_1 = require("providers/AlertContext");
var Alert = function (_a) {
    // Styles
    var styles = Alert_styles_1.useStyles();
    var alertContext = react_1.useContext(AlertContext_1.AlertContext);
    react_1.useEffect(function () {
        var event = setTimeout(function () {
            alertContext.setAlert(__assign(__assign({}, alert), { shouldDisplay: false }));
        }, 5000);
        return function () {
            clearTimeout(event);
        };
    }, [alert.shouldDisplay]);
    return alert.shouldDisplay ? (React.createElement(Flex_1["default"], { className: (alert.shouldDisplay ? styles.alertShow : styles.alertHidden) + " " + styles.alert, direction: Flex_d_1.FlexDirectionEnum.Horizontal },
        React.createElement(Alert, { severity: alert. }, "This is an error alert \u2014 check it out!"),
        React.createElement(Alert, { id: 'global-alert', status: alert.status, w: 'max-content', variant: 'left-accent' },
            React.createElement(AlertIcon, null),
            alert.message,
            React.createElement(CloseButton, { ml: '100', onClick: function () {
                    setAlert(__assign(__assign({}, alert), { shouldDisplay: false }));
                } })))) : null;
};
exports["default"] = Alert;
