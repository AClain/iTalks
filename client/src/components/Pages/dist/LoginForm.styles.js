"use strict";
exports.__esModule = true;
exports.useStyles = void 0;
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles({
    leftContainer: {
        width: "50%",
        background: "var(--text)"
    },
    rightContainer: {
        width: "50%"
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    title: {
        marginBottom: "15px"
    },
    icon: {
        color: "var(--text)"
    },
    loading: {
        color: "var(--text)"
    },
    error: {
        color: "var(--danger)"
    },
    checkboxContainer: {
        width: "max-content"
    },
    checkbox: {
        color: "var(--text)!important"
    },
    submit: {
        marginTop: "15px"
    }
});
exports.useStyles = useStyles;
