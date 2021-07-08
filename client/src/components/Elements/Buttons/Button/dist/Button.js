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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Button = void 0;
var core_1 = require("@material-ui/core");
var Button_styles_1 = require("./Button.styles");
var Button = function (_a) {
    var label = _a.label, variant = _a.variant, size = _a.size, fullWidth = _a.fullWidth, startIcon = _a.startIcon, endIcon = _a.endIcon, className = _a.className, rest = __rest(_a, ["label", "variant", "size", "fullWidth", "startIcon", "endIcon", "className"]);
    var styles = Button_styles_1.useStyles({ variant: variant, size: size, fullWidth: fullWidth });
    return (React.createElement(core_1.Button, __assign({ className: styles["default"] + " " + className, startIcon: startIcon, endIcon: endIcon }, rest), label));
};
exports.Button = Button;
