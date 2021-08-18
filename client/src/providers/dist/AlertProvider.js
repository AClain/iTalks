"use strict";
exports.__esModule = true;
var AlertProvider = /** @class */ (function () {
    function AlertProvider() {
        this.getClientTheme = function () {
            var currentTheme = localStorage.getItem("theme");
            if (currentTheme === null) {
                localStorage.setItem("theme", "dark");
                currentTheme = "dark";
            }
            return currentTheme;
        };
    }
    return AlertProvider;
}());
exports["default"] = new ThemeProvider();
