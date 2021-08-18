"use strict";
exports.__esModule = true;
// Material ui
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var TopContainer_styles_1 = require("./TopContainer.styles");
var TopContainer = function (_a) {
    var sidebar = _a.sidebar, page = _a.page, sideMargin = _a.sideMargin;
    // Styles
    var styles = TopContainer_styles_1.useStyles();
    var margin = sideMargin ? "50px " + sideMargin + "px 150px " + sideMargin + "px" : "50px 50px 150px 50px";
    return (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, fullWidth: true, height: '100%' },
        sidebar,
        React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Vertical, className: styles.pageContainer, p: margin }, page)));
};
exports["default"] = TopContainer;
