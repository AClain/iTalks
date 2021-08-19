"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var hi_1 = require("react-icons/hi");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var moment_1 = require("moment");
var PostSearchResults_styles_1 = require("./PostSearchResults.styles");
var IconWithText_1 = require("components/Elements/IconWithText/IconWithText");
var ResetLink_1 = require("components/Elements/Typograhpy/Link/ResetLink");
var PostSearchResults = function (_a) {
    var dataPosts = _a.dataPosts;
    var styles = PostSearchResults_styles_1.useStyles();
    return (React.createElement(core_1.Box, { className: styles.container },
        React.createElement(IconWithText_1["default"], { size: '35px', start: true, icon: React.createElement(hi_1.HiOutlineChatAlt2, { fontSize: 50 }), label: dataPosts.posts.length > 0 ? "Posts - Meilleurs résultats" : "Aucun résultat" }),
        dataPosts.total > 0 &&
            dataPosts.posts.map(function (p, k) { return (React.createElement(ResetLink_1["default"], { key: k, to: "/post/" + p.id },
                React.createElement(Flex_1["default"], { className: styles.postContainer, direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
                    React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H6, className: styles.title }, p.title),
                    React.createElement(core_1.Typography, { className: styles.user }, p.user.username),
                    React.createElement(core_1.Typography, { className: styles.date }, moment_1["default"](p.created_at).fromNow())))); })));
};
exports["default"] = PostSearchResults;
