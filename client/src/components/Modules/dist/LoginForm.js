"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
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
    var _c = react_1.useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    }), user = _c[0], setUser = _c[1];
    // Custom methods
    var onSubmit = function (data) {
        console.log(data);
    };
    var changePasswordVisibility = function () {
        setShowPassword(!showPassword);
    };
    var PasswordIcon = function () {
        return (React.createElement(core_1.IconButton, { className: styles.icon, onClick: changePasswordVisibility }, showPassword ? React.createElement(hi_1.HiEyeOff, null) : React.createElement(hi_1.HiEye, null)));
    };
    return (React.createElement(Flex_1["default"], { direction: Flex_1.FlexDirectionEnum.Vertical },
        React.createElement(Title_1["default"], { semantic: Title_d_1.TitleVariantEnum.H2 }, "Inscription"),
        React.createElement("form", { className: styles.form, noValidate: true, onSubmit: handleSubmit(onSubmit) },
            React.createElement(Flex_1["default"], { centered: true, direction: Flex_1.FlexDirectionEnum.Vertical },
                React.createElement(FormControl_1["default"], { label: "Nom d'utilisateur", type: 'text', identifier: 'username', register: register, startIcon: React.createElement(fa_1.FaUserCircle, null) }),
                React.createElement(FormControl_1["default"], { label: 'Adresse mail', type: 'text', identifier: 'email', register: register, startIcon: React.createElement(hi_1.HiAtSymbol, null) }),
                React.createElement(FormControl_1["default"], { label: 'Mot de passe', type: showPassword ? "text" : "password", identifier: 'password', register: register, endIcon: React.createElement(PasswordIcon, null) }),
                React.createElement(FormControl_1["default"], { label: 'Confirmation du mot de passe', type: showPassword ? "text" : "password", identifier: 'password_confirmation', register: register }),
                React.createElement(Button_1.Button, { label: "S'inscrire", type: 'submit' })))));
};
exports["default"] = LoginForm;
