import axios, { formToJSON } from 'axios';

const instance = axios.create({
	//baseURL: 'http://192.168.0.124:9000/'
    //baseURL:'http://176.197.167.29:9002/'
    //baseURL: 'http://192.168.0.128:9000/'
    baseURL: 'lppvlgz3jw.loclx.io'
    //baseURL: 'http://localhost:9000/'
}) 

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

export const searchRooms = async (fields) => {
	//console.log(fields)
    const {data} = await instance.post('api/rooms/search/', fields)
    return data;
}

export const getBooking = async (start, end) => {
    const {data} = await instance.get('api/rooms/booking', {params: {
        start, end }})
    return data
}

export const getRequest = async () => {
    const {data} = await instance.get('/api/request')
    return data
}

export const confirmRequest = async(id) => {
    console.log(id)
    const {data} = await instance.post('/api/request', {
        params:{
            bookingId: id
        }
    })
    return data
}


export const getEnd = async (start, end) => {
    const {data} = await instance.get('api/rooms/end')
    return data
}

export const createBooking = async (form) => {
    const {data} = await instance.post('api/booking/create', form)
    return data
}

export const createPayment = async (form) => {
    const {data} = await instance.post('api/payment/create', form)
    return data
}

export const createUser = async (form) => {
    const {data} = await instance.post('api/reg', form)
    return data
}

export const editRoom = async(id, price) => {
    const formData = {
        id,
        price
    }
    await instance.post('api/rooms/price', formData)
}
//http://176.196.11.180:9001/${room.image[0].image}
export const getPhoto = async(image) => {
   // console.log(`http://176.196.11.180:9001/${image}`)
    return await instance.get(`${image}`)
}

export default instance