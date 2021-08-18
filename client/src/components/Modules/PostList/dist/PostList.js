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
var core_1 = require("@material-ui/core");
var PostShort_1 = require("components/Submodules/PostShort/PostShort");
var PostList_styles_1 = require("./PostList.styles");
var Paginate_1 = require("components/Submodules/Paginate/Paginate");
var Loading_1 = require("components/Elements/Animations/Loading/Loading");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var PostList = function (_a) {
    var fetchPosts = _a.fetchPosts, reload = _a.reload;
    // Styles
    var styles = PostList_styles_1.useStyles();
    // Refs
    var topRef = react_1.useRef(null);
    // States
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState([]), posts = _c[0], setPosts = _c[1];
    var _d = react_1.useState(0), total = _d[0], setTotal = _d[1];
    var _e = react_1.useState({
        page: 1,
        limit: 15
    }), options = _e[0], setOptions = _e[1];
    // Custom methods
    var changePage = function (event, value) {
        if (topRef.current) {
            topRef.current.scrollIntoView();
        }
        setOptions(__assign(__assign({}, options), { page: value }));
    };
    // Effects
    react_1.useEffect(function () {
        setLoading(true);
        fetchPosts(options)
            .then(function (res) {
            console.log(res);
            setPosts(res.data.items);
            setTotal(res.data.total);
        })["catch"](function (err) { return console.error(err); })["finally"](function () {
            setLoading(false);
        });
        return function () { };
    }, [fetchPosts, options, reload]);
    return (React.createElement(core_1.Box, { className: styles.list },
        React.createElement("div", { ref: topRef }),
        React.createElement(Paginate_1["default"], { page: options.page, limit: options.limit, total: total, action: changePage }),
        loading ? (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, justify: Flex_d_1.FlexJustifyEnum.Center },
            React.createElement(Loading_1["default"], { radius: 15 }))) : (React.createElement(React.Fragment, null, posts.length > 0 ? (React.createElement(React.Fragment, null,
            posts.map(function (p, k) { return (React.createElement(PostShort_1["default"], { post: p, key: k })); }),
            React.createElement(Paginate_1["default"], { page: options.page, limit: options.limit, total: total, action: changePage }))) : (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Vertical, justify: Flex_d_1.FlexJustifyEnum.Center, align: Flex_d_1.FlexAlignEnum.Center, height: '100%' },
            React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H6 }, "Aucun post r\u00E9cent."),
            React.createElement(core_1.Typography, null, "Commencez \u00E0 suivre un utilisateur ou une cat\u00E9gorie.")))))));
};
exports["default"] = PostList;
