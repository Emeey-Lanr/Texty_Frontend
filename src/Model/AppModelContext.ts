 export const appModelContext = {
    appEndPoint: "",
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
  setSpinnerState:(spinnerState:boolean)=>{}
   
}
 
export  interface UserDetailsModel  {
    username: string,
    password:string
  }



