import {createSlice} from '@reduxjs/toolkit';

const initialState={
    currentUser:null
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signin:(state,action)=>{
            state.currentUser=action.payload
        },
        signup:(state,action)=>{
            state.currentUser=action.payload
        },
        signout:(state)=>{
            state.currentUser=null;
            localStorage.removeItem('token');
        }
    }
})

export const {signin,signup,signout}=userSlice.actions;
export default userSlice.reducer;