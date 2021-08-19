"use strict";
exports.__esModule = true;
// React
var react_1 = require("react");
// Librairies
var core_1 = require("@material-ui/core");
var Avatar_1 = require("components/Elements/Avatar/Avatar");
var Messages_styles_1 = require("./Messages.styles");
var UserList_1 = require("components/Modules/UserList/UserList");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var hi_1 = require("react-icons/hi");
var ChatBox_1 = require("components/Modules/ChatBox/ChatBox");
var auth_1 = require("api/auth");
var react_router_dom_1 = require("react-router-dom");
var api_request_1 = require("api/api.request");
var lodash_1 = require("lodash");
var FormControl_1 = require("components/Elements/Form/FormControl/FormControl");
var ResetLink_1 = require("components/Elements/Typograhpy/Link/ResetLink");
var Messages = function () {
    var styles = Messages_styles_1.useStyles();
    // React router
    var history = react_router_dom_1.useHistory();
    var id = react_router_dom_1.useParams().id;
    // States
    var _a = react_1.useState([]), users = _a[0], setUsers = _a[1];
    var _b = react_1.useState([]), searchUsers = _b[0], setSearchUsers = _b[1];
    var _c = react_1.useState(true), fetchingUsers = _c[0], setFetchingUsers = _c[1];
    // Functions
    var handleSearch = function (e) {
        var search = {
            limit: 10,
            page: 1,
            search: e.target.value
        };
        if (e.target.value.length > 1) {
            api_request_1.api.user
                .search(search)
                .then(function (res) {
                setSearchUsers(res.data.items);
            })["catch"](function (err) {
                console.error(err);
            });
            return true;
        }
        setSearchUsers([]);
        return false;
    };
    // Effects
    react_1.useEffect(function () {
        setFetchingUsers(true);
        api_request_1.api.message
            .all()
            .then(function (res) {
            setUsers(res.data.items);
        })["catch"](function (err) {
            console.error(err);
        })["finally"](function () {
            setFetchingUsers(false);
        });
    }, [id]);
    return (React.createElement(Flex_1["default"], { className: styles.container, direction: Flex_d_1.FlexDirectionEnum.Horizontal, width: '100%', height: '100%' },
        React.createElement(Flex_1["default"], { className: styles.userListContainer, direction: Flex_d_1.FlexDirectionEnum.Vertical },
            React.createElement(ResetLink_1["default"], { to: '/messages', style: { width: "100%" } },
                React.createElement(core_1.ListItem, { button: true },
                    React.createElement(core_1.ListItemIcon, null,
                        React.createElement(Avatar_1["default"], { username: auth_1["default"].getUsername(), link: auth_1["default"].getAvatarLink() })),
                    React.createElement(core_1.ListItemText, null, auth_1["default"].getUsername()))),
            React.createElement(core_1.Divider, null),
            React.createElement(FormControl_1["default"], { label: 'Rechercher un utilisateur', type: 'text', identifier: 'search', startIcon: React.createElement(hi_1.HiOutlineSearch, null), onKeyUp: lodash_1["default"].debounce(handleSearch, 250), fullWidth: true }),
            React.createElement(core_1.Divider, null),
            React.createElement(UserList_1["default"], { selectedUserId: id, users: searchUsers.length > 0 ? searchUsers : users })),
        React.createElement(ChatBox_1["default"], { fetchingUsers: fetchingUsers, recipientId: parseInt(id) })));
};
exports["default"] = Messages;
