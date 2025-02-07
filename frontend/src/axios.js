import axios, { formToJSON } from 'axios';

const instance = axios.create({
	///baseURL: 'http://192.168.0.124:9000/'
    //baseURL:'http://176.197.167.29:9002/'
    baseURL: 'http://localhost:9000/'
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



export default instance