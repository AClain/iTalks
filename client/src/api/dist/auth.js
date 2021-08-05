"use strict";
exports.__esModule = true;
var js_cookie_1 = require("js-cookie");
var jwt_decode_1 = require("jwt-decode");
var Auth = /** @class */ (function () {
    function Auth() {
        this.base_url = process.env.REACT_APP_SERVER_URL + "/api";
        this.token = js_cookie_1["default"].get("token");
    }
    Auth.prototype.isAuthenticated = function () {
        return typeof this.token !== "undefined";
    };
    Auth.prototype.isUnauthenticated = function () {
        return typeof this.token === "undefined";
    };
    Auth.prototype.decodedToken = function () {
        var decoded = jwt_decode_1["default"](this.token);
        return decoded;
    };
    Auth.prototype.isAdmin = function () {
        if (this.isUnauthenticated()) {
            return false;
        }
        if (this.decodedToken().role !== "admin")
            return false;
        return true;
    };
    return Auth;
}());
exports["default"] = new Auth();
