import React , {useState} from 'react';
import '../auth.css'
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/slicesAuth';

const Auth = () => {
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
	const dispatch = useDispatch()

    const onSubmit = async (values) => {
		const data = await dispatch(fetchUserData(values))
		if(!data.payload){
			return alert('Не удалось авторизоваться')
		}
		if('token' in data.payload){
            console.log(data)
			window.localStorage.setItem('token',data.payload.token)
		}
	}
    
    return (
        <div className='auth-wr'>
        <div class="auth-main">
            <h1>Авторизация</h1>
            <h6 style={{color:'#70756f'}}>Введите данные вашего аккаунта </h6>
            <form>
                <label for="first">
                    Логин:
                </label>
                <input type="text" id="first" name="first" 
                    placeholder="Enter your Username" required
                    onChange={(e) => setLogin(e.target.value)}/>

                <label for="password">
                    Пароль:
                </label>
                <input type="password" id="password" name="password" 
                    placeholder="Enter your Password" required
                    onChange={(e) => setPassword(e.target.value)}/>

                <div class="wrap">
                    <button className='btn-to-auth' type="submit" onClick={e => onSubmit()}>
                        Войти
                    </button>
                </div>
            </form>
        
        <p>Not registered?
            <a href="#">
                Create an account
            </a>
        </p>
        </div>
        </div>
    );
}

export default Auth;
