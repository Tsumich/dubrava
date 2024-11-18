import {configureStore} from '@reduxjs/toolkit'
import {roomsReducer} from './slices'

const store = configureStore({
	reducer: {
		rooms: roomsReducer,
	}
})

export {store} ;