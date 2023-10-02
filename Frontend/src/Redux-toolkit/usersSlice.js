import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: {
      Tz: '123'
    }
  },
  reducers: {
    setCurrentUser(state, action) {
      console.log(action.payload)
      state.currentUser = action.payload;
      console.log(state.currentUser)
    },
    // getCurrentUser(state, action) {
    //   return state.currentUser;
    // },
  }
})
// export const selectCurrentUser = (state) => {
//   return state.currentUser
// }
export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;

