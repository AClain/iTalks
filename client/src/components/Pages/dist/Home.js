"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var api_request_1 = require("api/api.request");
var CategoryList_1 = require("components/Modules/CategoryList/CategoryList");
var PostList_1 = require("components/Modules/PostList/PostList");
var CenteredTabs_1 = require("components/Submodules/Tabs/CenteredTabs/CenteredTabs");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Home = function () {
    // React router
    var history = react_router_dom_1.useHistory();
    var location = react_router_dom_1.useLocation();
    var currentPath = location.pathname;
    // States
    var _a = react_1.useState(0), currentTab = _a[0], setCurrentTab = _a[1];
    // Variables
    var tabHeaders = [
        { title: "Récent", color: "var(--info)" },
        { title: "Catégories", color: "var(--warning)" },
        { title: "Publier", color: "var(--success)" },
    ];
    // Functions
    var handleChange = function (event, newValue) {
        setCurrentTab(newValue);
        switch (newValue) {
            case 1:
                history.push("/categories");
                break;
            case 2:
                history.push("/new");
                break;
            default:
                history.push("/home");
                break;
        }
    };
    var getCurrentActiveTab = function (url) {
        if (["/", "/home", "/recent"].includes(url)) {
            return 0;
        }
        if (url.includes("categories")) {
            return 1;
        }
        return 2;
    };
    var fetchFeed = function (options) {
        return api_request_1.api.post.feed(options);
    };
    // Effects
    react_1.useEffect(function () {
        setCurrentTab(getCurrentActiveTab(currentPath));
        return function () { };
    }, [currentPath]);
    return (React.createElement(core_1.Box, { width: '100%' },
        React.createElement(CenteredTabs_1["default"], { currentTab: currentTab, tabHeaders: tabHeaders, tabPanels: [React.createElement(PostList_1["default"], { fetchPosts: fetchFeed }), React.createElement(CategoryList_1["default"], null), "Publier"], handleChange: handleChange })));
};
exports["default"] = Home;
