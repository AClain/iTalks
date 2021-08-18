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
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Avatar_1 = require("components/Elements/Avatar/Avatar");
var moment_1 = require("moment");
var BullDivider_1 = require("components/Elements/Layout/BullDivider/BullDivider");
var Comment_styles_1 = require("./Comment.styles");
var bi_1 = require("react-icons/bi");
var IconWithText_1 = require("components/Elements/IconWithText/IconWithText");
var Comment = function (_a) {
    var comment = _a.comment, rest = __rest(_a, ["comment"]);
    var styles = Comment_styles_1.useStyles();
    return (React.createElement(core_1.Box, __assign({ className: styles.container }, rest),
        React.createElement(Flex_1["default"], { className: styles.userInfos, direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
            React.createElement(Avatar_1["default"], { username: comment.user.username, link: comment.user.avatar }),
            React.createElement(core_1.Typography, { component: 'pre', style: { marginLeft: "15px" } }, comment.user.username),
            React.createElement(BullDivider_1["default"], null),
            React.createElement(core_1.Typography, { className: styles.timestamp }, moment_1["default"](comment.created_at).fromNow())),
        React.createElement(core_1.Typography, null, comment.text),
        React.createElement(IconWithText_1["default"], { start: false, icon: React.createElement(bi_1.BiDownArrow, null), label: "Afficher " + comment.children_comment_count + " r\u00E9ponse(s)" })));
};
exports["default"] = Comment;
