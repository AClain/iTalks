import { FC } from "react";
import {Box, Grid, ListItemText} from "@material-ui/core";
import { UserProfil } from "api/types/user";

import { useStyles } from "./BadgeCard.style";
import Badge from "components/Submodules/Profile/Badge/Badge";

export interface UserProps {
    user: UserProfil;
    [x: string]: any;
}

const BadgeCard: FC<UserProps> = ({ user, ...rest }) => {

    const styles = useStyles();

    console.log(user)

    return (
        <Box width='100%' className={styles.box}>
            <Grid item xs={3}>
                <div className={styles.card}>
                    <div className={styles.content}>
                        {user.badges.map((b, k) => (
                            <Badge key={k} name={b.name} resource={b.resource} />
                        ))}
                    </div>
                </div>
            </Grid>
        </Box>
    );
};

export default BadgeCard;