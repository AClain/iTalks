"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var api_request_1 = require("api/api.request");
var Loading_1 = require("components/Elements/Animations/Loading/Loading");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var CommentSection_1 = require("components/Modules/CommentSection/CommentSection");
var react_1 = require("react");
var hi_1 = require("react-icons/hi");
var react_router_dom_1 = require("react-router-dom");
var Post_styles_1 = require("./Post.styles");
var Post = function () {
    var styles = Post_styles_1.useStyles();
    var match = react_router_dom_1.useRouteMatch("/post/:id");
    var _a = react_1.useState(null), post = _a[0], setPost = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var savePost = function (id) {
        api_request_1.api.post
            .save(id)
            .then(function (res) {
            console.log(res.data);
            post.saved = true;
        })["catch"](function (err) {
            console.error(err);
        });
    };
    var unsavePost = function (id) {
        api_request_1.api.post
            .unsave(id)
            .then(function (res) {
            console.log(res.data);
            post.saved = false;
        })["catch"](function (err) {
            console.error(err);
        });
    };
    react_1.useEffect(function () {
        setLoading(true);
        api_request_1.api.post
            .get(parseInt(match.params.id))
            .then(function (res) {
            console.log(res.data);
            setPost(res.data);
        })["catch"](function (err) {
            console.error(err);
        })["finally"](function () {
            setLoading(false);
        });
        return function () { };
    }, [match === null || match === void 0 ? void 0 : match.params.id]);
    return (React.createElement(core_1.Box, null, loading ? (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal },
        React.createElement(Loading_1["default"], null))) : (post && (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Vertical },
        React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
            React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H3 }, post.title),
            post.saved ? (React.createElement(hi_1.HiBookmark, { onClick: function () {
                    unsavePost(post.id);
                }, className: styles.saved, size: 50 })) : (React.createElement(hi_1.HiOutlineBookmark, { onClick: function () {
                    savePost(post.id);
                }, className: styles.saved, size: 50 }))),
        React.createElement(core_1.Typography, { style: { margin: "150px 0px" } }, post.text),
        React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H5 },
            "Commentaires (",
            post.comment_count,
            ")"),
        React.createElement(CommentSection_1["default"], { postId: post.id }))))));
};
exports["default"] = Post;
