import { configureStore } from '@reduxjs/toolkit'
import userSlice from './usersSlice'
const store = configureStore({
    reducer: {
        users: userSlice,
    }
})
export default store;