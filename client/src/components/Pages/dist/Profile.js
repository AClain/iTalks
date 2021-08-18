"use strict";
exports.__esModule = true;
// Librairies
var core_1 = require("@material-ui/core");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var Avatar_1 = require("@material-ui/core/Avatar");
var Profile = function () {
    return (React.createElement(core_1.Box, { width: '100%' },
        React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H1 }, "Profil"),
        React.createElement(core_1.Grid, null,
            React.createElement(Avatar_1.Avatar, null))));
};
exports["default"] = Profile;
