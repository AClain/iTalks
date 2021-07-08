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
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var api_request_1 = require("api/api.request");
var Button_1 = require("components/Elements/Buttons/Button/Button");
var FormControl_1 = require("components/Elements/Form/FormControl/FormControl");
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var fa_1 = require("react-icons/fa");
var hi_1 = require("react-icons/hi");
var LoginForm_styles_1 = require("./LoginForm.styles");
var LoginForm = function () {
    var styles = LoginForm_styles_1.useStyles();
    // Hook form
    var _a = react_hook_form_1.useForm(), register = _a.register, handleSubmit = _a.handleSubmit;
    // States
    var _b = react_1.useState(false), showPassword = _b[0], setShowPassword = _b[1];
    var _c = react_1.useState({}), errors = _c[0], setErrors = _c[1];
    var _d = react_1.useState("username"), type = _d[0], setType = _d[1];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    // Custom methods
    var onSubmit = function (data) {
        console.log(data);
        setLoading(true);
        api_request_1.api.user
            .login(data)
            .then(function (res) {
            console.log(res);
        })["catch"](function (err) {
            var _a, _b;
            if ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.errors) {
                setErrors((_b = err.response) === null || _b === void 0 ? void 0 : _b.data.errors);
            }
        })["finally"](function () {
            setLoading(false);
        });
    };
    var handleSwitch = function () {
        if (type === "username") {
            setType("email");
            return;
        }
        setType("username");
    };
    var changePasswordVisibility = function () {
        setShowPassword(!showPassword);
    };
    // Custom components
    var PasswordIcon = function () {
        return (React.createElement(core_1.IconButton, { className: styles.icon, onClick: changePasswordVisibility }, showPassword ? React.createElement(hi_1.HiEyeOff, null) : React.createElement(hi_1.HiEye, null)));
    };
    return (React.createElement(Flex_1["default"], { direction: Flex_1.FlexDirectionEnum.Horizontal, height: '100%' },
        React.createElement(Flex_1["default"], { className: styles.leftContainer, direction: Flex_1.FlexDirectionEnum.Vertical, centered: true },
            React.createElement("img", { width: '70%', src: '/assets/images/login_authentication.svg', alt: 'authentification' })),
        React.createElement(Flex_1["default"], { className: styles.rightContainer, direction: Flex_1.FlexDirectionEnum.Vertical, centered: true },
            React.createElement(Title_1["default"], { className: styles.title, semantic: Title_d_1.TitleVariantEnum.H3 }, "Connexion"),
            React.createElement("form", { className: styles.form, noValidate: true, autoComplete: 'off', onSubmit: handleSubmit(onSubmit) },
                type === "username" ? (React.createElement(FormControl_1["default"], { error: typeof errors.identifier !== "undefined", label: "Nom d'utilisateur", type: 'text', identifier: 'identifier', register: register, startIcon: React.createElement(fa_1.FaUserCircle, null) })) : (React.createElement(FormControl_1["default"], { error: typeof errors.identifier !== "undefined", label: 'Adresse mail', type: 'text', identifier: 'identifier', register: register, startIcon: React.createElement(hi_1.HiAtSymbol, null) })),
                React.createElement("span", { className: styles.error }, errors.identifier),
                React.createElement("input", __assign({ type: 'hidden' }, register("type"), { name: 'type', value: type === "username" ? "username" : "email" })),
                React.createElement(core_1.FormControlLabel, { className: styles.checkboxContainer, control: React.createElement(core_1.Checkbox, { className: styles.checkbox, checked: type === "email", onChange: handleSwitch }), label: 'Utiliser mon adresse mail' }),
                React.createElement(FormControl_1["default"], { error: typeof errors.password !== "undefined", label: 'Mot de passe', type: showPassword ? "text" : "password", identifier: 'password', register: register, endIcon: React.createElement(PasswordIcon, null) }),
                React.createElement("span", { className: styles.error }, errors.password),
                React.createElement(Button_1.Button, { className: styles.submit, disabled: loading, label: "S'identifier", type: 'submit' })))));
};
exports["default"] = LoginForm;
