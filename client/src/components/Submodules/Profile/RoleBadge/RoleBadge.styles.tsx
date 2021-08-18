import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        background: (props: { color: string }) => (props.color),
        borderRadius: "0.3rem",
        padding: "2px 10px 2px 10px;",
        margin: "0px 50px 0px 50px"
    }
});

export { useStyles };