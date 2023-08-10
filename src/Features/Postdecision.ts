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
          console.log(action.payload.followers_following)
          let followUnfollow = -1
          // We check that user followers on profile, we check the our following on home post
           console.log(action.payload.followers_following);
          const userFollowingOrNot = action.payload.followers_following.find((users: { username: string }, id: Number) => users.username === `${action.payload.postBy}`)    
          if (userFollowingOrNot) {
            // means you're following the person
             followUnfollow = 0
          } else {
            // means you're not following the person
            followUnfollow = 1
          }

          return followUnfollow 
        }
        const followUnfollowNumber = check() 

        console.log(followUnfollowNumber)
        if (followUnfollowNumber === 0) {
          // if following, you can unfollow
          postDecisionFunction(`${action.payload.postBy}`, action.payload.time, true, false, true, false, false)
        } else {
          // if not following, you can follow
          postDecisionFunction(
            `${action.payload.postBy}`,
            action.payload.time,
            true,
            true,
            false,
            false,
            false
          );
        }
      }

           
    },
    openSpinner: (state, action) => {
      state.value.spinnerStatus = action.payload
    },
    actionDone: (state, action) => {

      const actionDoneFunction = (postedBy:string, time:string, postStatus:boolean, follow:boolean, unfollow:boolean, deletePost:boolean, sameUser:boolean) => {
               state.value.postedBy = postedBy;
               state.value.time = time;
               state.value.postStatus = postStatus;
               state.value.follow = follow;
               state.value.unfollow = unfollow;
               state.value.delete = deletePost;
               state.value.sameUser = sameUser;
            }
           
    }


      
        
    }
})



export const { closePostActionModal,openPostActionModal, openSpinner} = postDecisionSlice.actions

export default postDecisionSlice.reducer

