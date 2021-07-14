"use strict";
exports.__esModule = true;
exports.useStyles = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var useStyles = core_1.makeStyles({
    link: {
        width: "max-content",
        position: "relative",
        margin: "0px",
        padding: "0px",
        textDecoration: "none",
        "&:hover": {
            color: function (props) { return (props.color ? styles_1.darken(props.color, 0.5) : "var(--purple-focus)"); }
        },
        "&:visited": {
            color: "inherit"
        },
        "&:selected": {
            color: "inherit"
        }
    }
});
exports.useStyles = useStyles;
// const darkenedColor50Percent = darken('#4f4', 0.5);
