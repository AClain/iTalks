"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var api_request_1 = require("api/api.request");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var PostList_1 = require("components/Modules/PostList/PostList");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var CategoryPosts = function () {
    var match = react_router_dom_1.useRouteMatch("/category/:name");
    var _a = react_1.useState(false), reload = _a[0], setReload = _a[1];
    var fetchCategoryPosts = function (options) {
        return api_request_1.api.category.get(match.params.name, options);
    };
    react_1.useEffect(function () {
        setReload(!reload);
        return function () { };
    }, [match === null || match === void 0 ? void 0 : match.params.name]);
    return (React.createElement(React.Fragment, null, match && (React.createElement(core_1.Box, { width: '100%' },
        React.createElement(Title_1["default"], { style: { marginBottom: "25px" }, semantic: Title_d_1.TitleVariantEnum.H3 },
            "Cat\u00E9gorie: ",
            match.params.name),
        React.createElement(PostList_1["default"], { fetchPosts: fetchCategoryPosts, reload: reload })))));
};
exports["default"] = CategoryPosts;
