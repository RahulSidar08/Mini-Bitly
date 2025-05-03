import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    longUrl : [],
    shortUrl : []
}


export const linkSlice = createSlice({
    name : "Link",
    initialState,
    reducers : {
        setLongUrl : (state,action) => {
            state.linksData = action.payload
        },
        setShortUrl : (state,action) => {
            state.shortUrl = action.payload
        }
    }
})

export const {setLongUrl,setShortUrl} = linkSlice.actions;
export default linkSlice.reducer