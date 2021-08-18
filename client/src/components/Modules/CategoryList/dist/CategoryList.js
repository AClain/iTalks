"use strict";
exports.__esModule = true;
var react_1 = require("react");
var api_request_1 = require("api/api.request");
var CategoryShort_1 = require("components/Submodules/CategoryShort/CategoryShort");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Loading_1 = require("components/Elements/Animations/Loading/Loading");
var CategoryList = function () {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState([]), categories = _b[0], setCategories = _b[1];
    react_1.useEffect(function () {
        setLoading(true);
        api_request_1.api.category
            .all()
            .then(function (res) {
            setCategories(res.data);
        })["catch"](function (err) {
            console.error(err);
        })["finally"](function () {
            setLoading(false);
        });
        return function () { };
    }, []);
    return (React.createElement(React.Fragment, null, loading ? (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, justify: Flex_d_1.FlexJustifyEnum.Center },
        React.createElement(Loading_1["default"], { radius: 15 }))) : (categories.length > 0 && categories.map(function (c, k) { return React.createElement(CategoryShort_1["default"], { key: k, category: c }); }))));
};
exports["default"] = CategoryList;
