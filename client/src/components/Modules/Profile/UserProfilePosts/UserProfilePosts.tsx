// React
import {FC, useEffect, useState} from "react";
// Lib
import { Box } from "@material-ui/core";
// API
import {api} from "api/api.request";
// Components
import PostList from "components/Modules/PostList/PostList";

export interface UserProps {
    userId: number;
    [x: string]: any;
}

const UserProfilePosts: FC<UserProps> = ({ userId, ...rest }) => {

    const fetchCategoryPosts = () => {
        return api.post.ProfilePosts(userId);
    };

    return (
        <Box>
            <PostList fetchPosts={fetchCategoryPosts}/>
        </Box>
    );
}

export default UserProfilePosts;