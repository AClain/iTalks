"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var hi_1 = require("react-icons/hi");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var UserSearchResults_styles_1 = require("./UserSearchResults.styles");
var Avatar_1 = require("components/Elements/Avatar/Avatar");
var UserSearchResults = function (_a) {
    var dataUsers = _a.dataUsers;
    var styles = UserSearchResults_styles_1.useStyles();
    return (React.createElement(core_1.Box, { className: styles.container },
        React.createElement(hi_1.HiOutlineUserCircle, { fontSize: '50px' }),
        React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H5 }, dataUsers.total + " utilisateurs(s) trouvé(s)"),
        dataUsers.total > 0 &&
            dataUsers.users.map(function (u, k) { return (React.createElement(Flex_1["default"], { className: styles.userContainer, key: k, direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
                React.createElement(Avatar_1["default"], { username: u.username, link: u.avatar.link }),
                React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H6, className: styles.username }, u.username))); })));
};
exports["default"] = UserSearchResults;
