import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
    isSubmitBtnLoading : boolean
}

const initialState: LoadingState = {
    isSubmitBtnLoading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers:{
        setSubmitBtnLoading(state, action: PayloadAction<boolean>){
            state.isSubmitBtnLoading = action.payload;
        }
    }
})

export const { setSubmitBtnLoading } = loadingSlice.actions
export default loadingSlice.reducer