"use strict";
exports.__esModule = true;
// React
var react_1 = require("react");
// Api interface
var api_request_1 = require("api/api.request");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var Logout_styles_1 = require("./Logout.styles");
// Librairies
var react_router_dom_1 = require("react-router-dom");
var core_1 = require("@material-ui/core");
var hi_1 = require("react-icons/hi");
// Components
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Loading_1 = require("components/Elements/Animations/Loading/Loading");
var Logout = function () {
    var styles = Logout_styles_1.useStyles();
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(false), refresh = _b[0], setRefresh = _b[1];
    var reload = function () {
        setRefresh(!refresh);
    };
    react_1.useEffect(function () {
        api_request_1.api.user
            .logout()
            .then(function (res) {
            localStorage.setItem("isAuthenticated", "false");
            history.push("/login");
        })["catch"](function (err) {
            console.error(err);
        });
        setTimeout(function () {
            setLoading(false);
        }, 1500);
        return function () {
            setLoading(true);
        };
    }, [refresh]);
    return (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Vertical, align: Flex_d_1.FlexAlignEnum.Center, justify: Flex_d_1.FlexJustifyEnum.End, width: '100%' },
        React.createElement("img", { src: '/assets/images/logout_floating.svg', alt: 'floating', className: styles.floating }),
        React.createElement("img", { src: '/assets/images/logout_sleeping.svg', alt: 'sleeping', className: styles.sleeping }),
        React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H2 }, "D\u00E9connexion"),
        loading ? (React.createElement(Loading_1["default"], { radius: 15 })) : (React.createElement(core_1.IconButton, { onClick: reload, className: styles.refresh },
            React.createElement(hi_1.HiOutlineRefresh, null)))));
};
exports["default"] = Logout;
