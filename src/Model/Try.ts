import { createContext } from "react";
interface AllContextInterFace {
  // socket:{current:""},
  socket:()=>void,
    routeIdentification: string;
      setRouteIdentification:(routeIdentification:string)=>{};
    userEndPoint:string;
  hideSideBar: string;
  setHideSideBar: (hideSideBar:string)=>{};
  showSideBarBtn:()=>{};
  hidebarBool: false;
  hideSideBarBtn: () => {};
  // // 
  loginModalState: false;
  setLoginModalState: (LoginMessageModal:boolean)=>{};
  loginModalMessage: string;
  setLoginModalMessage: (loginModalMessage:string)=>{};
  
  // // 
  spinnerState: false;
  setSpinnerState:(spinnerState:boolean)=>{};

  // 
    openPrePost:false;
   setOpenPrePost:(openPrePost:boolean)=>{};
   createPostModal:false;
   setCreatePostModal:(createPostModal:boolean)=>{};
   createGroupModal:false;
   setCreateGroupModal:(createGroupModal:boolean)=>{};
   postModalStatus:false;
      setPostModalStatus:(postModalStatus:boolean)=>{}
}
export const AllContext = createContext<AllContextInterFace | null>(null)