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
// Librairies
var core_1 = require("@material-ui/core");
// Types
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var IconWithText_styles_1 = require("./IconWithText.styles");
// Components
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var IconWithText = function (_a) {
    var size = _a.size, icon = _a.icon, label = _a.label, start = _a.start, rest = __rest(_a, ["size", "icon", "label", "start"]);
    var styles = IconWithText_styles_1.useStyles({ size: size });
    return (React.createElement(Flex_1["default"], __assign({ direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center }, rest),
        start && icon,
        " ",
        React.createElement(core_1.Typography, { className: styles.label }, label),
        " ",
        !start && icon));
};
exports["default"] = IconWithText;
