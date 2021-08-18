"use strict";
exports.__esModule = true;
exports.useStyles = void 0;
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles({
    alert: {
        position: "fixed",
        bottom: "55px",
        paddingRight: "50px",
        width: "100%"
    },
    alertShow: {
        animation: "fadeIn 0.4s both"
    },
    alertHidden: {
        display: "none!important"
    }
});
exports.useStyles = useStyles;
/**
 *
@keyframes fadeIn {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
 */
