
export interface UserProfile {
    registerdUserIdentification: string;
    id: number;
    username: string;
    about_me: string | null;
    img_url: string | null;
    followers: {}[] | [] | null;
    following: {}[] | [] | null;
    checkBothFollowing: {}[] | null | [];
    checkBothFollwers: {}[] | null | [];
    post: {}[] | [] | null;
    isLoggedIn: boolean;

}