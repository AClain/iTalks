"use strict";
exports.__esModule = true;
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var ResetLink_1 = require("components/Elements/Typograhpy/Link/ResetLink");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var Category = function (_a) {
    var category = _a.category;
    return (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Start, justify: Flex_d_1.FlexJustifyEnum.SpaceEvenly },
        React.createElement(Flex_1["default"], { width: '80%', direction: Flex_d_1.FlexDirectionEnum.Vertical },
            React.createElement(ResetLink_1["default"], { to: "/category/" + category.id, color: category.color },
                React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H4 }, category.name)),
            React.createElement("span", null, category.description)),
        React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Vertical },
            React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H5 }, category.post_count.toString()),
            React.createElement("span", null, "Posts"))));
};
exports["default"] = Category;
