import { POST } from "../Redux/HomePost";
export interface UserProfile {
  blockedState: boolean;
  blockedNumber: number;
  registerdUserIdentification: string;
  registeredUserImgUrl: string;
  registeredUserBlocked: { username: string }[];
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
  post: POST[];
  blocked: { username: string }[];
  socketPost: {}[] | [];
  homePost: {}[] | [] | null;
  isLoggedIn: boolean;
  loggedInUserNotification: {}[] | [];
}
