"use strict";
exports.__esModule = true;
exports.api = void 0;
var axios_1 = require("axios");
var user_requests_1 = require("api/modules/user.requests");
var post_request_1 = require("api/modules/post.request");
var category_requests_1 = require("api/modules/category.requests");
var auth_1 = require("api/auth");
var message_requests_1 = require("./modules/message.requests");
var comment_requests_1 = require("./modules/comment.requests");
var stat_requests_1 = require("./modules/stat.requests");
var admin_requests_1 = require("./modules/admin.requests");
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
        this.user = new user_requests_1["default"](this.instance);
        this.post = new post_request_1["default"](this.instance);
        this.category = new category_requests_1["default"](this.instance);
        this.message = new message_requests_1["default"](this.instance);
        this.comment = new comment_requests_1["default"](this.instance);
        this.stat = new stat_requests_1["default"](this.instance);
        this.admin = new admin_requests_1["default"](this.instance);
    }
    return Api;
}());
var api = new Api();
exports.api = api;
