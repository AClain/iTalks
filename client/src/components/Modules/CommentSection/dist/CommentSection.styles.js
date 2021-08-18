"use strict";
exports.__esModule = true;
exports.useStyles = void 0;
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles({
    form: {
        marginBottom: "25px"
    },
    messageFormControl: {
        width: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            display: "none"
        },
        maxHeight: "200px"
    },
    messageInput: {
        color: "var(--text)"
    },
    messageInputIcon: {
        color: "var(--text)"
    }
});
exports.useStyles = useStyles;
