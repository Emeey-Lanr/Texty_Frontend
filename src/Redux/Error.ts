import { createSlice } from "@reduxjs/toolkit";


const errorValue:{message:string, status:boolean} = {
    message: "",
    status:false
}


export  const errorSlice = createSlice({
    name: "texty_error",
    initialState: { value: errorValue },
    reducers: {
        openClose: (state, action) => {
            if (state.value.status) {
                state.value.status = false
                state.value.message = ""
            } else {
                state.value.message = action.payload.message
                state.value.status = true
            }
        }
    }

})

export const { openClose} = errorSlice.actions
export default errorSlice.reducer