import { FC } from "react";
import { Box } from "@material-ui/core";
import { UserProfil } from "api/types/user";

import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum, FlexAlignEnum } from "components/Elements/Layout/Flex/Flex.d"

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
        <Box mt='10px' p='25px' boxShadow='var(--medium-box-shadow)'>
            <Flex direction={FlexDirectionEnum.Vertical} align={FlexAlignEnum.Center}>
                {user.badges.map((b, k) => (
                    <Badge key={k} name={b.name} resource={b.resource} />
                ))}
            </Flex>
        </Box>
    );
};

export default BadgeCard;