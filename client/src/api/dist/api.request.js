"use strict";
exports.__esModule = true;
exports.api = void 0;
var axios_1 = require("axios");
var user_request_1 = require("api/modules/user.request");
var post_requests_1 = require("api/modules/post.requests");
var category_request_1 = require("api/modules/category.request");
var auth_1 = require("api/auth");
var Api = /** @class */ (function () {
    function Api() {
        this.url = auth_1["default"].base_url;
        this.instance = axios_1["default"].create({
            baseURL: this.url,
            headers: {
                Authorization: "Basic " + auth_1["default"].token
            },
            withCredentials: true
        });
        this.user = new user_request_1["default"](this.instance);
        this.post = new post_requests_1["default"](this.instance);
        this.category = new category_request_1["default"](this.instance);
    }
    return Api;
}());
var api = new Api();
exports.api = api;
