"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var hi_1 = require("react-icons/hi");
var UserSearchResults_styles_1 = require("./UserSearchResults.styles");
var UserShort_1 = require("components/Submodules/UserShort/UserShort");
var IconWithText_1 = require("components/Elements/IconWithText/IconWithText");
var UserSearchResults = function (_a) {
    var dataUsers = _a.dataUsers;
    var styles = UserSearchResults_styles_1.useStyles();
    return (React.createElement(core_1.Box, { className: styles.container },
        React.createElement(IconWithText_1["default"], { size: '35px', start: true, icon: React.createElement(hi_1.HiOutlineUserCircle, { fontSize: 50 }), label: dataUsers.users.length > 0 ? "Utilisateurs - Meilleurs résultats" : "Aucun résultat" }),
        dataUsers.total > 0 && dataUsers.users.map(function (u, k) { return React.createElement(UserShort_1["default"], { key: k, user: u }); })));
};
exports["default"] = UserSearchResults;
