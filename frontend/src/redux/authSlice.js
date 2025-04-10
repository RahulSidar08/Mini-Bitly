import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : null
}

export const counterSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUser: (state,action) => {
        state.user = action.payload
    },
    logout: (state, action) => {
      state.user = null
    },
  },
})

// Action creators are generated for each case reducer function
export const {setUser,logout } = counterSlice.actions

export default counterSlice.reducer