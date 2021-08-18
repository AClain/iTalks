"use strict";
exports.__esModule = true;
exports.AlertContext = exports.AlertContextVariantEnum = void 0;
var react_1 = require("react");
var AlertContextVariantEnum;
(function (AlertContextVariantEnum) {
    AlertContextVariantEnum["Info"] = "info";
    AlertContextVariantEnum["Success"] = "success";
    AlertContextVariantEnum["Warning"] = "warning";
    AlertContextVariantEnum["Error"] = "error";
})(AlertContextVariantEnum = exports.AlertContextVariantEnum || (exports.AlertContextVariantEnum = {}));
var DEFAULT_CONTEXT = {
    message: "Info",
    variant: AlertContextVariantEnum.Info,
    shouldDisplay: false
};
exports.AlertContext = react_1.createContext({ alert: DEFAULT_CONTEXT, setAlert: function () { } });
