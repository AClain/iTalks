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
var FormControl_styles_1 = require("./FormControl.styles");
var core_1 = require("@material-ui/core");
var FormControl = function (_a) {
    var label = _a.label, identifier = _a.identifier, type = _a.type, defaultValue = _a.defaultValue, register = _a.register, startIcon = _a.startIcon, endIcon = _a.endIcon, rest = __rest(_a, ["label", "identifier", "type", "defaultValue", "register", "startIcon", "endIcon"]);
    var styles = FormControl_styles_1.useStyles();
    var dynamicProp = [];
    if (defaultValue) {
        dynamicProp.push({ defaultValue: defaultValue });
    }
    return (React.createElement(core_1.FormControl, { variant: 'filled', className: styles.formControl },
        React.createElement(core_1.InputLabel, { htmlFor: identifier, className: styles.label }, label),
        React.createElement(core_1.FilledInput, __assign({ id: identifier, name: identifier, type: type, className: styles.input }, dynamicProp, register(identifier), { startAdornment: startIcon ? React.createElement(core_1.InputAdornment, { position: 'start' }, startIcon) : undefined, endAdornment: endIcon ? React.createElement(core_1.InputAdornment, { position: 'end' }, endIcon) : undefined }, rest))));
};
exports["default"] = FormControl;
