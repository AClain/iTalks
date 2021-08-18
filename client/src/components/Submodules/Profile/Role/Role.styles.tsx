import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        background: (props: { color: string }) => (props.color),
        borderRadius: '.25rem',
        padding: '2px 5px 2px 5px',
        marginLeft: '.4rem'
    }
});

export { useStyles };