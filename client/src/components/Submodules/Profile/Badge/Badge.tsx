import {FC} from "react";
import {Box} from "@material-ui/core";
import Avatar from "components/Elements/Avatar/Avatar"

interface RoleBadgeProps {
    name :string,
    resource :string
}

const Badge: FC<RoleBadgeProps> = ({ name, resource}) => {

    console.log(resource)
    return (
        <Box width='100%'>
            <Avatar username={name} link={resource}/>
            {name}
        </Box>
    );
};

export default Badge;