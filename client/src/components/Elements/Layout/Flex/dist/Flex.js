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
var core_1 = require("@material-ui/core");
var DIRECTIONS = {
    horizontal: "row",
    vertical: "column"
};
var Flex = function (_a) {
    var direction = _a.direction, justify = _a.justify, align = _a.align, centered = _a.centered, fullWidth = _a.fullWidth, width = _a.width, children = _a.children, rest = __rest(_a, ["direction", "justify", "align", "centered", "fullWidth", "width", "children"]);
    return (React.createElement(core_1.Box, __assign({}, rest, { display: 'flex', justifyContent: centered ? "center" : justify, alignItems: centered ? "center" : align, flexDirection: DIRECTIONS[direction], color: 'var(--text)', width: fullWidth ? "100%" : width }), children));
};
exports["default"] = Flex;
