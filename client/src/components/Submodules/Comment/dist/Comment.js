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
var react_1 = require("react");
var Avatar_1 = require("components/Elements/Avatar/Avatar");
var moment_1 = require("moment");
var BullDivider_1 = require("components/Elements/Layout/BullDivider/BullDivider");
var Comment_styles_1 = require("./Comment.styles");
var io_1 = require("react-icons/io");
var IconWithText_1 = require("components/Elements/IconWithText/IconWithText");
var api_request_1 = require("api/api.request");
var ResetLink_1 = require("components/Elements/Typograhpy/Link/ResetLink");
var Comment = function (_a) {
    var comment = _a.comment, rest = __rest(_a, ["comment"]);
    var styles = Comment_styles_1.useStyles();
    var _b = react_1.useState(false), showChildren = _b[0], setShowChildren = _b[1];
    var _c = react_1.useState([]), childrenComments = _c[0], setChildrenComments = _c[1];
    var displayChilrenLabel = function () {
        return (showChildren ? "Cacher " : "Afficher ") + comment.children_comment_count + " réponse(s)";
    };
    react_1.useEffect(function () {
        if (showChildren) {
            api_request_1.api.comment
                .getChildren(comment.id)
                .then(function (res) {
                setChildrenComments(res.data);
            })["catch"](function (err) {
                console.error(err);
            });
        }
    }, [showChildren]);
    if (!comment) {
        return null;
    }
    return (React.createElement(core_1.Box, __assign({ className: styles.container }, rest),
        React.createElement(Flex_1["default"], { className: styles.userInfos, direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
            React.createElement(Avatar_1["default"], { username: comment.user.username, link: comment.user.avatar }),
            React.createElement(ResetLink_1["default"], { to: "/profile/" + comment.user.id },
                React.createElement(core_1.Typography, { component: 'pre', style: { marginLeft: "15px" } }, comment.user.username)),
            React.createElement(BullDivider_1["default"], null),
            React.createElement(core_1.Typography, { className: styles.timestamp }, moment_1["default"](comment.created_at).fromNow())),
        React.createElement(core_1.Typography, null, comment.text),
        comment.children_comment_count > 0 && (React.createElement(IconWithText_1["default"], { className: styles.childrenCommentButton, margin: '15px 0px', textColor: 'var(--info)', start: false, icon: showChildren ? React.createElement(io_1.IoMdArrowDropup, { color: 'var(--info)' }) : React.createElement(io_1.IoMdArrowDropdown, { color: 'var(--info)' }), size: '14px', label: displayChilrenLabel(), onClick: function () {
                setShowChildren(!showChildren);
            } })),
        showChildren && childrenComments.length > 0 && childrenComments.map(function (c, k) { return React.createElement(Comment, { comment: c, key: k }); })));
};
exports["default"] = Comment;
