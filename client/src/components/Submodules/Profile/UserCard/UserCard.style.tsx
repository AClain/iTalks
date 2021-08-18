import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        display: "flex",
        minWidth: "100px",
        boxShadow: "0px 0px 11px 0px rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 29%)",
        borderRadius: ".25rem",
        padding: "0.7rem",
        justifyContent: 'center'
    },
    body: {
        display: "flex",
        padding: "1rem"
    },
    content: {
        textAlign: "center"
    }
});

export { useStyles };