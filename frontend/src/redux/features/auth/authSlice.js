import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
    role: '',
}

export const registerUser = createAsyncThunk('user/registerUser', async ({ email, password, first_name, last_name, phone }) => {
    try {
        const { data } = await axios.post('/user/registration', { email, password, first_name, last_name, phone })

        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }

        return data

    } catch (error) {
        console.log(error)
    }
})

export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }) => {
    try {
        const { data } = await axios.post('/user/login', { email, password })

        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }

        return data

    } catch (error) {
        console.log(error)
    }
})

export const currentUser = createAsyncThunk('user/currentUser', async () => {
    try {
        const { data } = await axios.get('/user/current')

        return data

    } catch (error) {
        console.log(error)
    }
})

export const getRoleUser = createAsyncThunk('user/getRoleUser', async () => {
    try {
        const { data } = await axios.get('/user/role')

        const role = data.userRole

        return role

    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        // register
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        // login 
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        // current
        [currentUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [currentUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [currentUser.rejectWithValue]: (state, action) => {
            state.isLoading = false
        },

        // role
        [getRoleUser.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [getRoleUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.role = action.payload
        },
        [getRoleUser.rejectWithValue]: (state, action) => {
            state.isLoading = false
        },
    },
})

export const checkIsAuth = state => Boolean(state.auth.token)
export const checkRole = state => state.auth.role
export const { logout } = authSlice.actions
export default authSlice.reducer
