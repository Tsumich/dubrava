import React , {useState} from 'react';
//import '../auth.css'
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/slicesAuth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
	const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (event) => {
        const formData = {
            login, 
            password
        }
        event.preventDefault();
		const data = await dispatch(fetchUserData(formData))
		if(!data.payload){
			return alert('Не удалось авторизоваться')
		}
		else if('token' in data.payload){
			window.localStorage.setItem('token',data.payload.token)
            navigate('/')
            window.location.reload()
		}
	}
    require('../auth.css')

    return (
        
         <div className='auth-wr'>
        <div class="auth-main">
            <form onSubmit={ onSubmit }>
            <h1>Авторизация</h1>
            <h6 style={{color:'#70756f'}}>Введите данные вашего аккаунта </h6>
            <div>
                <label for="first">
                    Логин:
                </label>
                <input type="text" id="first" name="first" 
                    placeholder="Логин " required
                    onChange={(e) => setLogin(e.target.value)}/>

                <label for="password">
                    Пароль:
                </label>
                <input type="password" id="password" name="password"
                    placeholder="Пароль" required
                    onChange={(e) => setPassword(e.target.value)}/>

                <div class="wrap">
                    <button className='btn-to-auth' type='submit'>
                        Войти
                    </button>
                </div>
            </div>
        </form>
      
        </div>
        </div>
    );
}

export default Auth;
