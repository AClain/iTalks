import { FC } from "react";
import {Box, Grid, ListItemIcon, ListItemText} from "@material-ui/core";
import { UserProfil } from "api/types/user";
import Avatar from "components/Elements/Avatar/Avatar";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";

import { useStyles } from "./UserCard.style";
import RoleBadge from "../RoleBadge/RoleBadge";
import Button from "../../../Elements/Buttons/Button/Button";

export interface UserProps {
    user: UserProfil;
    [x: string]: any;
}

const UserCard: FC<UserProps> = ({ user, ...rest }) => {

    const styles = useStyles();

    return (
        <Box width='100%'>
            <Grid item xs={3}>
                <div className={styles.card}>
                    <div className={styles.content}>
                        <ListItemIcon>
                            <Avatar size={100} username={user.username} link={user.avatar} />
                        </ListItemIcon>
                        <ListItemText><Title semantic={TitleVariantEnum.H6}>{user.username}</Title></ListItemText>
                        <ListItemText><RoleBadge role={user.role}/></ListItemText>
                        <Button label='Follow' type='submit' color='var(--light)' />
                        <Button label='Message' type='submit' color='var(--light)' />
                    </div>
                </div>
            </Grid>
        </Box>
    );
};

export default UserCard;