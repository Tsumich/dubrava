import {configureStore} from '@reduxjs/toolkit'
import {roomsReducer} from './slices'
import {authReducer} from './slicesAuth'

const store = configureStore({
	reducer: {
		rooms: roomsReducer,
		auth: authReducer
	}
})

export {store} ;