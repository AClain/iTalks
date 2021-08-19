"use strict";
exports.__esModule = true;
// React
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
// Librairies
var core_1 = require("@material-ui/core");
// Components
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var UserInfo_1 = require("components/Submodules/Profile/UserInfo/UserInfo");
var BadgeList_1 = require("components/Submodules/Profile/BadgeList/BadgeList");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var CenteredTabs_1 = require("components/Submodules/Tabs/CenteredTabs/CenteredTabs");
var UserProfilePosts_1 = require("components/Modules/Profile/UserProfilePosts/UserProfilePosts");
var UserProfileComments_1 = require("components/Modules/Profile/UserProfileComments/UserProfileComments");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
// Api
var api_request_1 = require("../../api/api.request");
var auth_1 = require("api/auth");
var Loading_1 = require("components/Elements/Animations/Loading/Loading");
var UserProfileFollowers_1 = require("components/Modules/Profile/UserProfilFollowers/UserProfileFollowers");
var Profile = function () {
    var match = react_router_dom_1.useRouteMatch("/profile/:id");
    var history = react_router_dom_1.useHistory();
    // States
    var _a = react_1.useState(0), currentTab = _a[0], setCurrentTab = _a[1];
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    var tabHeaders = [
        { title: "Posts", color: "var(--info)" },
        { title: "Commentaire", color: "var(--warning)" },
        { title: "Follower", color: "var(--info)" },
    ];
    var handleChange = function (event, newValue) {
        setCurrentTab(newValue);
    };
    react_1.useEffect(function () {
        console.log(true);
        if (match) {
            if (auth_1["default"].getUserId() === parseInt(match.params.id)) {
                history.push("/profile");
                return;
            }
            api_request_1.api.user
                .get(parseInt(match.params.id))
                .then(function (res) {
                console.log(res);
                setUser(res.data);
            })["catch"](function (err) {
                console.error(err);
            });
        }
        else {
            api_request_1.api.user
                .profil()
                .then(function (res) {
                console.log(res);
                setUser(res.data);
            })["catch"](function (err) {
                console.error(err);
            });
        }
    }, [match === null || match === void 0 ? void 0 : match.params.id]);
    return (React.createElement(core_1.Box, { width: '100%' },
        React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H1 }, "Profil"),
        React.createElement(Flex_1["default"], { p: '25px', direction: Flex_d_1.FlexDirectionEnum.Horizontal },
            React.createElement(core_1.Box, { mr: '10px', width: '35%' }, user ? (React.createElement(React.Fragment, null,
                React.createElement(UserInfo_1["default"], { user: user, setUser: setUser }),
                user.badges.length > 0 && React.createElement(BadgeList_1["default"], { user: user }))) : (React.createElement(Loading_1["default"], null))),
            React.createElement(core_1.Box, { width: '65%' },
                React.createElement(core_1.Box, { p: '25px', boxShadow: 'var(--medium-box-shadow)' }, user ? (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Vertical },
                    React.createElement(CenteredTabs_1["default"], { currentTab: currentTab, tabHeaders: tabHeaders, tabPanels: [
                            React.createElement(UserProfilePosts_1["default"], { userId: user.id }),
                            React.createElement(UserProfileComments_1["default"], { userId: user.id }),
                            React.createElement(UserProfileFollowers_1["default"], { userId: user.id }),
                        ], handleChange: handleChange }))) : (React.createElement(Loading_1["default"], null)))))));
};
exports["default"] = Profile;
