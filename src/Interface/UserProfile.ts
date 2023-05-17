
interface POST {
    text: string;
    img_url: string;
    comment: {username:string, words:string}[],
    likes:string[],
    
}
export interface UserProfile {
    registerdUserIdentification: string;
    registeredUserImgUrl: string;
    userId: string;
    notuserId: string;
    username: string;
    about_me: string | null;
    img_url: string | null;
    background_img_url: string | null;
    followers: {}[] | [] | null;
    following: {}[] | [] | null;
    ifUserFollowing: {}[] | null | [];
    ifUserFollowers: {}[] | null | [];
    post: POST[] | [] | null;
    socketPost: {}[] | [];
    homePost: {}[] | [] | null;
    isLoggedIn: boolean;
    loggedInUserNotification:{}[] |  []

}