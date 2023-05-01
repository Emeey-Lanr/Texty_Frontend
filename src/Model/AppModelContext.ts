import { useRef } from "react"
import { Socket } from "socket.io-client"

export const appModelContext = {
  // socket:{current:""},
  // socket:,
    
   routeIdentification:"",
      setRouteIdentification:(routeIdentification:string)=>{},
    userEndPoint: "",
  hideSideBar: "",
  setHideSideBar: (hideSideBar:string)=>{},
  showSideBarBtn:()=>{},
  hidebarBool: false,
  hideSideBarBtn: () => {},
  // // 
  loginModalState: false,
  setLoginModalState: (LoginMessageModal:boolean)=>{},
  loginModalMessage: "",
  setLoginModalMessage: (loginModalMessage:string)=>{},
  
  // // 
  spinnerState: false,
  setSpinnerState:(spinnerState:boolean)=>{},

  // 
    openPrePost:false,
   setOpenPrePost:(openPrePost:boolean)=>{},
   createPostModal:false,
   setCreatePostModal:(createPostModal:boolean)=>{},
   createGroupModal:false,
   setCreateGroupModal:(createGroupModal:boolean)=>{},
   postModalStatus:false,
  setPostModalStatus: (postModalStatus: boolean) => { },
      username:"",
  setUsername: (username: string) => { },
      
  // 
  getUserProfile: (id: string, route: string) => { },
  noUserFound: false,
}

// export  const appValue = {
    
//         userEndPoint,
//         hideSideBar,
//         setHideSideBar,
//         showSideBarBtn,
//       hidebarBool,
//       hideSideBarBtn,
// // // 
//       loginModalState,
//    setLoginModalState,
//       loginModalMessage,
//       setLoginModalMessage,
//       // 
//       spinnerState,
//       setSpinnerState,
//       openPrePost,
//    setOpenPrePost,
//    createPostModal,
//    setCreatePostModal,
//    createGroupModal,
//    setCreateGroupModal,
      
        
    

//   }
 
export  interface UserDetailsModel  {
  username: string;
  password: string;
  img_url?: string;
  about_me?: string;
  post?: {}[]
  following?: [];
  followers?: [];
  notification?: [];
  state?: string;
  }



