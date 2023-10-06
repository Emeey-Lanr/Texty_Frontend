
export const appModelContext = {
   suggestedUserF:()=>{},
  routeIdentification: "",
  setRouteIdentification: (routeIdentification: string) => {},
  userEndPoint: "",
  hideSideBar: "",
  setHideSideBar: (hideSideBar: string) => {},
  showSideBarBtn: () => {},
  hidebarBool: false,
  hideSideBarBtn: () => {},
  // //
  loginModalState: false,
  setLoginModalState: (LoginMessageModal: boolean) => {},
  loginModalMessage: "",
  setLoginModalMessage: (loginModalMessage: string) => {},

  // //
  spinnerState: false,
  setSpinnerState: (spinnerState: boolean) => {},

  //
  openPrePost: false,
  setOpenPrePost: (openPrePost: boolean) => {},
  createPostModal: 0,
  setCreatePostModal: (createPostModal: number) => {},
  createGroupModal: false,
  setCreateGroupModal: (createGroupModal: boolean) => {},
  postModalStatus: false,
  setPostModalStatus: (postModalStatus: boolean) => {},
  username: "",
  setUsername: (username: string) => {},

  //
  getUserProfile: (id: string, route: string) => {},
  noUserFound: false,
  userExitOrNot:"",
  userProfileLoading: false,
  setUserProfileLoading: (userProfileLoading: boolean) => {},
  about_meText: "",
  setAbout_MeText: (about_meText: string) => {},
  followFunction: (
    socketName: string,
    loggedInUsername: string,
    userTheyWantToFollow: string,
    notificationWords: string
  ) => {},
  unfollowFunction: (
    socketName: string,
    userLoggedInUserName: string,
    userTheyWantToUnfollow: string
  ) => {},
  actionModalId: -1,
  setActionModalId: (actionModalId: number) => {},
  openActionModal: false,
  setOpenActionModal: (openActionModal: boolean) => {},
  groupChatOrPrivateChatOpening: -1,
  setGroupChatOrPrivateChatOpening: (
    groupChatOrPrivateChatOpening: number
  ) => {},
  showGroupModal: 0,
  setShowGroupModal: (showGroupModal: number) => {},
  newPostAlert: false,
  setNewPostAlert: (newPostAlert: boolean) => {},
  newPostForFollowersFunction: () => {},
  userNewPostFunction: () => {},
  incomingMessageDetails: () => {},
  messageEndPoint: "",
  openEditProfile: false,
  setOpenEditProfile: (openEditProfile: boolean) => {},
  likeUnlikeSocketFunction: (
    socketName: string,
    time: number,
    name: string,
    state: string
  ) => {},
  blocked: false,
  setBlocked: (blocked: boolean) => {},
  blockedNumber: 0,
  setBlockedNumber: (blockedNumber: number) => {},
  incomingBlockedSocket: () => {},
  slide: () => {},
  icon: "",
  hide: "",
  openSuggest: () => {},
  alwaysOpenSuggested: "",
  openReportModal:false,
  setOpenReportModal: (openReportModal: boolean) => { },
  messageError: "",
  setMessageError:(messageError:string)=>{}
};


 
export  interface UserDetailsModel  {
  username: string;
  password: string;
  img_url?: string;
  background_img_url?:string,
  about_me?: string;
  post?: {}[]
  following?: [];
  followers?: [];
  notification?: [];
  blocked?: [];
  state?: string;
  }



