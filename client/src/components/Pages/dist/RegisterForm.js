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
// React
var react_1 = require("react");
// Api interface
var api_request_1 = require("api/api.request");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Title_d_1 = require("components/Elements/Typograhpy/Title/Title.d");
var RegisterForm_styles_1 = require("./RegisterForm.styles");
// Librairies
var react_hook_form_1 = require("react-hook-form");
var core_1 = require("@material-ui/core");
var fa_1 = require("react-icons/fa");
var hi_1 = require("react-icons/hi");
// Components
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var FormControl_1 = require("components/Elements/Form/FormControl/FormControl");
var Title_1 = require("components/Elements/Typograhpy/Title/Title");
var Button_1 = require("components/Elements/Buttons/Button/Button");
var ResetLink_1 = require("components/Elements/Typograhpy/Link/ResetLink");
var react_router_dom_1 = require("react-router-dom");
var AlertContext_1 = require("providers/AlertContext");
var RegisterForm = function () {
    var styles = RegisterForm_styles_1.useStyles();
    var _a = react_1.useContext(AlertContext_1.AlertContext), alert = _a.alert, setAlert = _a.setAlert;
    var history = react_router_dom_1.useHistory();
    // Hook form
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit;
    // States
    var _c = react_1.useState(false), showPassword = _c[0], setShowPassword = _c[1];
    var _d = react_1.useState({}), errors = _d[0], setErrors = _d[1];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    // Custom methods
    var onSubmit = function (data) {
        setLoading(true);
        api_request_1.api.user
            .register(data)
            .then(function (res) {
            setAlert(__assign(__assign({}, alert), { message: res.data.message, variant: AlertContext_1.AlertContextVariantEnum.Info, shouldDisplay: true }));
            if (res.status === 201) {
                history.push("/login");
            }
        })["catch"](function (err) {
            var _a, _b;
            if ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.errors) {
                setErrors((_b = err.response) === null || _b === void 0 ? void 0 : _b.data.errors);
            }
        })["finally"](function () {
            setLoading(false);
        });
    };
    var changePasswordVisibility = function () {
        setShowPassword(!showPassword);
    };
    // Custom components
    var PasswordIcon = function () {
        return (React.createElement(core_1.IconButton, { className: styles.icon, onClick: changePasswordVisibility }, showPassword ? React.createElement(hi_1.HiEyeOff, null) : React.createElement(hi_1.HiEye, null)));
    };
    return (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal, height: '100%' },
        React.createElement(Flex_1["default"], { className: styles.leftContainer, direction: Flex_d_1.FlexDirectionEnum.Vertical, centered: true },
            React.createElement(Title_1["default"], { className: styles.title, semantic: Title_d_1.TitleVariantEnum.H3 }, "Inscription"),
            React.createElement("form", { className: styles.form, noValidate: true, autoComplete: 'off', onSubmit: handleSubmit(onSubmit) },
                React.createElement(FormControl_1["default"], { error: typeof errors.username !== "undefined", label: "Nom d'utilisateur", type: 'text', identifier: 'username', register: register, startIcon: React.createElement(fa_1.FaUserCircle, null) }),
                React.createElement("span", { className: styles.error }, errors.username ? errors.username[0] : ""),
                React.createElement(FormControl_1["default"], { error: typeof errors.email !== "undefined", label: 'Adresse mail', type: 'text', identifier: 'email', register: register, startIcon: React.createElement(hi_1.HiAtSymbol, null) }),
                React.createElement("span", { className: styles.error }, errors.email ? errors.email[0] : ""),
                React.createElement(FormControl_1["default"], { error: typeof errors.password !== "undefined", label: 'Mot de passe', type: showPassword ? "text" : "password", identifier: 'password', register: register, endIcon: React.createElement(PasswordIcon, null) }),
                React.createElement("span", { className: styles.error }, errors.password ? errors.password[0] : ""),
                React.createElement(FormControl_1["default"], { error: typeof errors.password_confirmation !== "undefined", label: 'Confirmation du mot de passe', type: showPassword ? "text" : "password", identifier: 'password_confirmation', register: register }),
                React.createElement("span", { className: styles.error }, errors.password_confirmation ? errors.password_confirmation[0] : ""),
                React.createElement(Flex_1["default"], { className: styles.submitContainer, direction: Flex_d_1.FlexDirectionEnum.Horizontal, align: Flex_d_1.FlexAlignEnum.Center },
                    React.createElement(Button_1["default"], { disabled: loading, label: "S'inscrire", type: 'submit' }),
                    " ",
                    React.createElement(ResetLink_1["default"], { className: styles.registerLink, to: '/login' }, "D\u00E9j\u00E0 inscrit ?")))),
        React.createElement(Flex_1["default"], { className: styles.rightContainer, direction: Flex_d_1.FlexDirectionEnum.Vertical, centered: true },
            React.createElement("img", { width: '70%', src: '/assets/images/register_imagination.svg', alt: 'authentification' }))));
};
exports["default"] = RegisterForm;
