"use strict";
exports.__esModule = true;
exports.useStyles = void 0;
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles({
    container: {
        backdropFilter: "blur(16px)",
        webkitBackdropFilter: "blur(16px)",
        background: "rgba(17, 25, 40, 0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)"
    },
    card: {
        width: "100%"
    }
});
exports.useStyles = useStyles;
