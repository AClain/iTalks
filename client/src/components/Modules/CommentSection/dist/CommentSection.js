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
var api_request_1 = require("api/api.request");
var Loading_1 = require("components/Elements/Animations/Loading/Loading");
var react_1 = require("react");
var Comment_1 = require("components/Submodules/Comment/Comment");
var Paginate_1 = require("components/Submodules/Paginate/Paginate");
var react_hook_form_1 = require("react-hook-form");
var bi_1 = require("react-icons/bi");
var CommentSection_styles_1 = require("components/Modules/CommentSection/CommentSection.styles");
var CommentSection = function (_a) {
    var postId = _a.postId, rest = __rest(_a, ["postId"]);
    // Styles
    var styles = CommentSection_styles_1.useStyles();
    // Hook form
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, getValues = _b.getValues, reset = _b.reset;
    // Refs
    var topRef = react_1.useRef(null);
    // States
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(false), sending = _d[0], setSending = _d[1];
    var _e = react_1.useState([]), comments = _e[0], setComments = _e[1];
    var _f = react_1.useState(0), total = _f[0], setTotal = _f[1];
    var _g = react_1.useState({
        page: 1,
        limit: 15
    }), options = _g[0], setOptions = _g[1];
    // Custom methods
    var send = function () {
        if (!sending) {
            setSending(true);
            api_request_1.api.comment
                .send(postId, getValues("message"))
                .then(function (res) {
                reset();
            })["catch"](function (err) {
                console.error(err);
            })["finally"](function () {
                setSending(false);
            });
        }
    };
    var handleKeyDown = function (e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            send();
        }
    };
    var changePage = function (event, value) {
        if (topRef.current) {
            topRef.current.scrollIntoView();
        }
        setOptions(__assign(__assign({}, options), { page: value }));
    };
    // Effects
    react_1.useEffect(function () {
        setLoading(true);
        api_request_1.api.comment
            .all(postId, options)
            .then(function (res) {
            setComments(res.data.items);
            setTotal(res.data.total);
        })["catch"](function (err) {
            console.error(err);
        })["finally"](function () {
            setLoading(false);
        });
        return function () { };
    }, [options, postId]);
    return (React.createElement(core_1.Box, null,
        React.createElement("form", { className: styles.form, noValidate: true, autoComplete: 'off', onSubmit: handleSubmit(send) },
            React.createElement(core_1.FormControl, { className: styles.messageFormControl, variant: 'outlined' },
                React.createElement(core_1.OutlinedInput, __assign({ id: 'message', type: 'text', placeholder: 'Ajouter un commentaire ...', multiline: true }, register("message"), { className: styles.messageInput, endAdornment: React.createElement(core_1.InputAdornment, { position: 'end' },
                        React.createElement(core_1.IconButton, { onClick: send },
                            React.createElement(bi_1.BiSend, { className: styles.messageInputIcon }))), onKeyDown: handleKeyDown })))),
        React.createElement("div", { ref: topRef }),
        loading ? (React.createElement(Loading_1["default"], null)) : (React.createElement(core_1.Box, null,
            comments.map(function (c, k) { return (React.createElement(Comment_1["default"], { comment: c, key: k })); }),
            React.createElement(Paginate_1["default"], { options: options, total: total, action: changePage })))));
};
exports["default"] = CommentSection;
