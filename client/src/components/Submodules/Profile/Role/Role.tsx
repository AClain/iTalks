import {cloneElement, FC} from "react";
import IconWithText from "components/Elements/IconWithText/IconWithText";
import {RiShieldStarFill} from "react-icons/ri";
import {BiShieldQuarter, HiCubeTransparent, HiTerminal} from "react-icons/all";

import { useStyles } from "./Role.styles";

const roleRelation : any = {
    "developer" : {
        color : 'blue',
        icon : <HiTerminal/>
    },
    "admin" : {
        color : 'red',
        icon : <RiShieldStarFill/>
    },
    "moderator" : {
        color : 'orange',
        icon : <BiShieldQuarter/>
    },
    "company" : {
        color : 'purple',
        icon : <HiCubeTransparent/>
    }
}

interface RoleBadgeProps {
    role :string
}

const Role: FC<RoleBadgeProps> = ({ role}) => {

    const styles = useStyles({color:roleRelation[role].color});

    return (
        <IconWithText className={styles.root} icon={cloneElement(roleRelation[role].icon, {fontSize : "25px"})} label={role} />
    );
};

export default Role;