import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice"
import recordSlice from "./features/record/recordSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        record: recordSlice
    }
})