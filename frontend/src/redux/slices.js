import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchRooms = createAsyncThunk('rooms/fetchRooms',async() => {
	const { data } = await axios.get('/api/rooms/all');
	return data;
})


const initialState =  {
	rooms: {
		items: [],
		status: 'loading',
        room: null
	},
    booking: null
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
		setRoom: (state, action) => {
			state.rooms.room = action.payload
		},
        setBooking: (state, action) => {
			state.booking = action.payload
		},
        setRoomImageTitle: (state, action) => {
            state.rooms[action.payload].title ='aa' 
		}
	},
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.pending, (state) => {
           state.rooms.items = []
            state.rooms.status = 'loading'
        })
        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.rooms.items = action.payload
             state.rooms.status = 'loaded'
         })
         builder.addCase(fetchRooms.rejected, (state) => {
            state.rooms.items = []
             state.rooms.status = 'error'
         })
    }
})

export const roomsReducer = roomsSlice.reducer

export const {setRoom} = roomsSlice.actions

export const {setBooking} = roomsSlice.actions

export const {setRoomImageTitle} = roomsSlice.actions


export const getRoom = state => state.rooms.rooms.room

export const getBooking = state => state.rooms.booking