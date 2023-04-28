
export interface UserProfile {
    registerdUserIdentification: string;
    id: number;
    username: string;
    about_me: string | null;
    img_url: string | null;
    followers: {}[] | [] | null;
    following: {}[] | [] | null;
    ifUserFollowing: {}[] | null | [];
    ifUserFollowers: {}[] | null | [];
    post: {}[] | [] | null;
    homePost: {}[] | [] | null;
    notification: [] | null;
    isLoggedIn: boolean;

}