"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var PostShort_styles_1 = require("./PostShort.styles");
var moment_1 = require("moment");
var ResetLink_1 = require("components/Elements/Typograhpy/Link/ResetLink");
var ri_1 = require("react-icons/ri");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var IconWithText_1 = require("components/Elements/IconWithText/IconWithText");
var VoteCount_1 = require("../VoteCount/VoteCount");
var CategoryBadge_1 = require("components/Elements/Badge/CategoryBadge/CategoryBadge");
var BullDivider_1 = require("components/Elements/Layout/BullDivider/BullDivider");
var PostShort = function (_a) {
    var post = _a.post;
    var styles = PostShort_styles_1.useStyles();
    var shortenContent = function (content) {
        return content.substring(0, 150) + "...";
    };
    if (!post) {
        return null;
    }
    return (React.createElement(Flex_1["default"], { className: styles.container, direction: Flex_d_1.FlexDirectionEnum.Horizontal, justify: Flex_d_1.FlexJustifyEnum.SpaceBetween },
        React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Vertical, className: styles.infos },
            React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
                React.createElement(ResetLink_1["default"], { to: "/post/" + post.id },
                    React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H4 }, post.title)),
                React.createElement(VoteCount_1["default"], { votes: post.vote_count, positive: post.feedback }),
                post.categories.map(function (c, k) { return (React.createElement(CategoryBadge_1["default"], { category: c, key: k })); })),
            React.createElement(core_1.Typography, { className: styles.content }, shortenContent(post.text)),
            React.createElement(Flex_1["default"], { className: styles.postInfo, align: Flex_d_1.FlexAlignEnum.Center, justify: Flex_d_1.FlexJustifyEnum.SpaceBetween, direction: Flex_d_1.FlexDirectionEnum.Horizontal },
                React.createElement(Flex_1["default"], { align: Flex_d_1.FlexAlignEnum.Center, direction: Flex_d_1.FlexDirectionEnum.Horizontal },
                    React.createElement(ResetLink_1["default"], { to: "/profile/" + post.user.id },
                        React.createElement(core_1.Typography, { className: styles.user }, post.user.username)),
                    React.createElement(BullDivider_1["default"], null),
                    React.createElement(core_1.Typography, { className: styles.date }, moment_1["default"](post.created_at).fromNow())),
                React.createElement(IconWithText_1["default"], { start: true, icon: React.createElement(ri_1.RiChat4Line, { fontSize: '18px' }), label: post.comment_count.toString() }))),
        post.assiociated_resources ? (React.createElement("img", { src: post.assiociated_resources[0].link, alt: 'post img', className: styles.image })) : null));
};
exports["default"] = PostShort;
