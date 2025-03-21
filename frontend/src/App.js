import MainPage from './pages/MainPage';
import Searching from './pages/Searching'
import { observer } from 'mobx-react-lite';
import Header from './components/Header';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from './redux/slices';
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import RoomPage from './pages/RoomPage';
import BookingForm from './pages/BookingForm';
import Footer from './components/Footer';
import { fetchAuthMe, isAuthSelector } from './redux/slicesAuth';
import AdminBooking from './pages/AdminBooking';
import AdminRooms from './pages/AdminRooms';
import About from './pages/About';
import Request from './components/Request';



const App = observer(() => {

	const dispatch = useDispatch()
  const {rooms} = useSelector(state => state.rooms)
	const isAuth = useSelector(isAuthSelector)
	console.log(isAuth)
	React.useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])
	
  const isRoomLoading = rooms.status === 'loading'
	
	React.useEffect(() => {
			dispatch(fetchRooms())
	}, [])

  const routes = [
    {
      path: '/',
      Component: MainPage
    },
    {
      path: '/search',
      Component: Searching
    },
    {
      path: '/profile',
      Component : Admin
    },
    {
      path: '/bookings',
      Component : AdminBooking
    },
    {
      path: '/req',
      Component : Request
    },
    {
      path: '/roomslist',
      Component : AdminRooms
    },
    {
      path: '/login',
      Component : Auth
    },
    {
      path: '/room/:id',
      Component : RoomPage
    },
    {
      path:'/booking',
      Component: BookingForm
    },
    {
      path:'/about',
      Component: About
    }

  ]
  return ( 
    <PrimeReactProvider>  
    <BrowserRouter>
    <Header/>
    <Routes>
        {routes.map(({path, Component}) =>
          <Route path={path} element={<Component/>} key={path} exact/>
        )},
        
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
        
    </Routes>
   <Footer/>
   
    </BrowserRouter>
    </PrimeReactProvider>
  )
})

export default App;
