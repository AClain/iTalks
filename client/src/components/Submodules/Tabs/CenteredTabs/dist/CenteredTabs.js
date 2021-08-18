"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var CenteredTabs_styles_1 = require("./CenteredTabs.styles");
var TabPanel_1 = require("../TabPanel/TabPanel");
var CenteredTabs = function (_a) {
    var currentTab = _a.currentTab, tabHeaders = _a.tabHeaders, tabPanels = _a.tabPanels, light = _a.light, handleChange = _a.handleChange, rest = __rest(_a, ["currentTab", "tabHeaders", "tabPanels", "light", "handleChange"]);
    var styles = CenteredTabs_styles_1.useStyles();
    return (React.createElement(core_1.Box, __assign({ className: styles.container }, rest),
        React.createElement(core_1.Tabs, { TabIndicatorProps: { style: { background: tabHeaders[currentTab].color } }, value: currentTab, onChange: handleChange, indicatorColor: 'primary' }, tabHeaders.map(function (tabHeader, i) { return (React.createElement(core_1.Tab, { style: {
                color: currentTab === i ? tabHeader.color : light ? "var(--bg)" : "var(--text)"
            }, className: styles.tab, label: tabHeader.title, icon: tabHeader.icon, key: i, value: i })); })),
        tabPanels.map(function (tabPanel, i) { return (React.createElement(TabPanel_1["default"], { key: i, value: currentTab, index: i }, tabPanel)); })));
};
exports["default"] = CenteredTabs;
