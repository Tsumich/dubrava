import MainPage from './pages/MainPage';
import Searching from './pages/Searching'
import { observer } from 'mobx-react-lite';
import Header from './components/Header';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from './redux/slices';
import React, { Component, useLayoutEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import RoomPage from './pages/RoomPage';
import BookingForm from './pages/BookingForm';
import Footer from './components/Footer';
import { fetchAuthMe, isAuthSelector } from './redux/slicesAuth';
import AdminBooking from './pages/AdminBooking';
import AdminRooms from './pages/AdminRooms';
import About from './pages/About';
import Request from './components/Request';
import { ScrollRestoration } from 'react-router-dom';
import {addLocale, locale } from 'primereact/api';
import AdminUsers from './pages/AdminUsers';
import {store} from './redux/store'
const App = () => {

  addLocale('ru', {
        firstDayOfWeek: 1, // 1 = Понедельник (0 = Воскресенье)
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        today: 'Сегодня',
        clear: 'Очистить'
    });

	const dispatch = useDispatch()
  const {rooms} = useSelector(state => state.rooms)
  const auth = useSelector(state => state.auth)

 	React.useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])
	
  const isRoomLoading = rooms.status === 'loading'

	React.useEffect(() => {
			dispatch(fetchRooms())
	}, [])

  const isAuth = useSelector(isAuthSelector)

  const adminRoutes = [
    {
      path: '/admin/bookings',
      Component : AdminBooking
    },
    {
      path: '/admin/req',
      Component : Request
    },
    {
      path: '/roomslist',
      Component : AdminRooms
    },
    {
      path: '/admin/users',
      Component: AdminUsers
    },
    {
      path: '/admin/profile',
      Component: Admin
    }
  ]

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
      path: '/login',
      Component : Auth
    },
    {
      path: '/room/:id',
      Component : RoomPage
    },
    {
      path:'/room/:id/booking',
      Component: BookingForm
    },
    {
      path:'/about',
      Component: About
    },
  ]
  return ( 
    <PrimeReactProvider>  
        <BrowserRouter>
        <Header/>
        <Routes>
            {routes.map(({path, Component}) =>
              <Route path={path} element={<Component/>} key={path} exact/>
            )},
          
            {isAuth ? adminRoutes.map(({path, Component}) =>
              <Route path={path} element={<Component/>} key={path} exact/>
            ) : <></> },

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
            
            
        </Routes>
        <Footer/>
        </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App;
