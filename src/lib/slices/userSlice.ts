import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInfoState {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    id: string
}

const initialState: {info: UserInfoState} = {
    info: {
        email: "",
        firstname: "",
        id: "",
        lastname: '',
        username: ""
    }
}


export const  userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
            state.info = action.payload
        }
    }
})

export const {setUserInfo} = userSlice.actions

export default userSlice.reducer