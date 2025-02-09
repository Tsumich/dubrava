import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchUserData = createAsyncThunk('/auth/fetchUserData', async(params) => {
	const { data } = await axios.post('/api/login', params) // в парамсах имейл и пароль
	return data;
})

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async() => {
	const { data } = await axios.get('/api/auth/me') 
	return data;
})

export const fetchRegister = createAsyncThunk('/auth/fetchRegister', async(params) => {
	const { data } = await axios.post('/api/register', params) 
	return data;
})

const initialState =  {
	data: null,
	status: 'loading'
};

const authSlice = createSlice({
	name: 'auth', // название слайса
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null
		}
	},
	extraReducers: (builder) => {
		// reducers for login
		builder.addCase(fetchUserData.pending, (state) => {
			state.data = null
			state.status = 'loading'
		 })
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.data = action.payload
             state.status = 'loaded'
         })
		builder.addCase(fetchUserData.rejected, (state) => {
            state.data = []
             state.status = 'error'
        })
		
		// reducers for auth
		builder.addCase(fetchAuthMe.pending, (state) => {
			state.data = null
			state.status = 'loading'
		 })
		builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.data = action.payload
             state.status = 'loaded'
         })
		builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null
             state.status = 'error'
        })

		// reducers for register
		builder.addCase(fetchRegister.pending, (state) => {
			state.data = null
			state.status = 'loading'
		 })
		builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.data = action.payload
             state.status = 'loaded'
         })
		builder.addCase(fetchRegister.rejected, (state) => {
            state.data = null
             state.status = 'error'
        })
		
	}
})
// функция проверяет если инфа о юзере есть в состоянии значит авторизован
export const isAuthSelector = state => Boolean(state.auth.data)

export const { logout } = authSlice.actions

export const authReducer = authSlice.reducer