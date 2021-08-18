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
var AlertContext_1 = require("providers/AlertContext");
var lab_1 = require("@material-ui/lab");
var Alert = function (_a) {
    // Styles
    var styles = Alert_styles_1.useStyles();
    var _b = react_1.useContext(AlertContext_1.AlertContext), alert = _b.alert, setAlert = _b.setAlert;
    react_1.useEffect(function () {
        var event = setTimeout(function () {
            setAlert(__assign(__assign({}, alert), { shouldDisplay: false }));
        }, 50000000);
        return function () {
            clearTimeout(event);
        };
    }, [alert.shouldDisplay]);
    return alert.shouldDisplay ? (React.createElement(lab_1.Alert, { className: styles.alert + " " + (alert.shouldDisplay ? styles.alertShow : styles.alertHidden), severity: alert.variant })) : null;
};
exports["default"] = Alert;
