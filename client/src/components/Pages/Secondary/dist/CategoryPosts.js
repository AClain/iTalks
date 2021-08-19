"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var api_request_1 = require("api/api.request");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var PostShort_1 = require("components/Submodules/PostShort/PostShort");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var List_1 = require("components/Modules/List/List");
var CategoryPosts = function () {
    var match = react_router_dom_1.useRouteMatch("/category/:name");
    var _a = react_1.useState(false), reload = _a[0], setReload = _a[1];
    function fetchCategoryPosts(options) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, api_request_1.api.category.get(match.params.name, options)];
            });
        });
    }
    react_1.useEffect(function () {
        setReload(!reload);
        return function () { };
    }, [match === null || match === void 0 ? void 0 : match.params.name]);
    return (React.createElement(React.Fragment, null, match && (React.createElement(core_1.Box, { width: '100%' },
        React.createElement(Title_1["default"], { style: { marginBottom: "25px" }, semantic: Title_d_1.TitleVariantEnum.H3 },
            "Cat\u00E9gorie: ",
            match.params.name),
        React.createElement(List_1["default"], { reload: reload, fetchItems: fetchCategoryPosts, itemComponent: React.createElement(PostShort_1["default"], null), itemProp: 'post' })))));
};
exports["default"] = CategoryPosts;
