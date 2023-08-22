import { createSlice } from "@reduxjs/toolkit";
export interface suggestedUserProfile {
  username: string;
  img_url: string;
  about_me: string;
}
const suggestedUser:suggestedUserProfile[] = []
export const suggestedUserSlice = createSlice({
    name:"suggestedUser",
    initialState: { value: suggestedUser },
    reducers: {
        getSuggestedUsersDetails: (state, action) => {
            state.value = action.payload
        }
    }
})


export const { getSuggestedUsersDetails } = suggestedUserSlice.actions
export default suggestedUserSlice.reducer