import MainPage from './pages/MainPage';
import Searching from './pages/Searching'
import { observer } from 'mobx-react-lite';
import Header from './components/Header';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Admin from './pages/Admin';
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from './redux/slices';
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import RoomPage from './pages/RoomPage';
import BookingForm from './pages/BookingForm';
import Footer from './components/Footer';
 


const App = observer(() => {

	const dispatch = useDispatch()
  const {rooms} = useSelector(state => state.rooms)

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
      path: '/admin',
      Component : Admin
    },
    {
      path: '/room/:id',
      Component : RoomPage
    },
    {
      path:'/booking',
      Component: BookingForm
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
