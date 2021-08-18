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
var react_router_dom_1 = require("react-router-dom");
var Post = function () {
    var match = react_router_dom_1.useRouteMatch("/post/:id");
    var _a = react_1.useState(null), post = _a[0], setPost = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        setLoading(true);
        api_request_1.api.post
            .get(parseInt(match.params.id))
            .then(function (res) {
            console.log(res);
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
        React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H3 }, post.title),
        React.createElement(core_1.Typography, { style: { margin: "150px 0px" } }, post.text),
        React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H5 },
            "Commentaires (",
            post.comment_count,
            ")"),
        React.createElement(CommentSection_1["default"], { postId: post.id }))))));
};
exports["default"] = Post;
