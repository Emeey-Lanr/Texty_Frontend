import {createSlice} from "@reduxjs/toolkit"


interface PostDecision {
  area:string,
  spinnerStatus:number
  postedBy:string
  time:string
  postStatus: boolean
  follow: boolean
  unfollow: boolean
  sameUser: boolean
  delete:boolean
  
 

}
const postDecisionState: PostDecision = {
  area:"",
  spinnerStatus:-1,
  postedBy:"",
  time:"",
  postStatus: false,
  follow: false,
  unfollow: false,
  sameUser: false,
  delete:false,

}

export const postDecisionSlice = createSlice({
    name:"postDescision",
    initialState: { value: postDecisionState },
  reducers: {
    closePostActionModal: (state, action) => {
      state.value.postStatus = action.payload
      state.value.spinnerStatus = 0
    },
    openPostActionModal: (state, action) => {
      state.value.area = action.payload.area
      const postDecisionFunction = (postBy:string, timePosted:string, postStatus:boolean, follow:boolean, unfollow:boolean, deletePost:boolean, sameUser:boolean) => {
        state.value.postedBy = postBy
        state.value.time = timePosted  
        state.value.postStatus = postStatus
        state.value.follow = follow
        state.value.unfollow = unfollow
        state.value.delete = deletePost
        state.value.sameUser = sameUser
      }
      // alert(action.payload);
      if (action.payload.postBy === action.payload.loggedInUser) {
        postDecisionFunction(`${action.payload.postBy}`, action.payload.time, true, false, false,  true, true)
      
      } else {
        const check = () => {
         
          let followUnfollow = -1
//   we check the searched for person on our profile folllowers to check if we are there on the profile page
          
         
          const userFollowingOrNot = action.payload.followers_following.find((users: { username: string }, id: Number) => users.username === `${action.payload.userToCheck}`)    
          if (userFollowingOrNot) {
            // means you're following the person
              postDecisionFunction(`${action.payload.postBy}`, action.payload.time, true, false, true, false, false)
          } else {
            // means you're not following the person
              postDecisionFunction(
            `${action.payload.postBy}`,
            action.payload.time,
            true,
            true,
            false,
            false,
            false
          );
            followUnfollow = 1
          }

 
        }
        check()
       
      }

           
    },
    openSpinner: (state, action) => {
      state.value.spinnerStatus = action.payload
    },
    postActionDone: (state, action) => {
           state.value.postedBy = "";
               state.value.time = "";
               state.value.postStatus = false;
               state.value.follow = false;
               state.value.unfollow = false;
               state.value.delete = false;
               state.value.sameUser = false;

     
           
    }


      
        
    }
})



export const { closePostActionModal,openPostActionModal, openSpinner, postActionDone} = postDecisionSlice.actions

export default postDecisionSlice.reducer

