"use strict";
exports.__esModule = true;
// Librairies
var core_1 = require("@material-ui/core");
// Types
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var IconWithText_styles_1 = require("./IconWithText.styles");
// Components
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var IconWithText = function (_a) {
    var icon = _a.icon, label = _a.label;
    var styles = IconWithText_styles_1.useStyles();
    return (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
        icon,
        " ",
        React.createElement(core_1.Typography, { className: styles.label }, label)));
};
exports["default"] = IconWithText;
