"use strict";
exports.__esModule = true;
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var core_1 = require("@material-ui/core");
var hi_1 = require("react-icons/hi");
var VoteCount = function (_a) {
    var votes = _a.votes, positive = _a.positive;
    return (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
        React.createElement(core_1.IconButton, { style: { color: "var(--text)" }, size: 'medium' }, positive ? React.createElement(hi_1.HiChevronDoubleUp, { color: 'var(--success)' }) : React.createElement(hi_1.HiChevronUp, null)),
        React.createElement(core_1.Typography, null, votes),
        React.createElement(core_1.IconButton, { style: { color: "var(--text)" }, size: 'medium' }, !positive && positive !== null ? React.createElement(hi_1.HiChevronDoubleDown, { color: 'var(--danger)' }) : React.createElement(hi_1.HiChevronDown, null))));
};
exports["default"] = VoteCount;
