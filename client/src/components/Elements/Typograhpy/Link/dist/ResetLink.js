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
var react_router_dom_1 = require("react-router-dom");
var ResetLink_styles_1 = require("./ResetLink.styles");
var ResetLink = function (_a) {
    var to = _a.to, children = _a.children, className = _a.className, color = _a.color, target = _a.target, rest = __rest(_a, ["to", "children", "className", "color", "target"]);
    var styles = ResetLink_styles_1.useStyles({ color: color });
    return (React.createElement(react_router_dom_1.Link, __assign({ target: target, className: styles.link + " " + className, to: to }, rest), children));
};
exports["default"] = ResetLink;
