import '../css/Login.css';
import {
    Link,
    redirect,
    useFetcher,
} from "react-router-dom";
import {register} from '../utils.js';

export async function action({ request }) {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    
    if(userData.password !== userData.password2){
        return "Oba hasła muszą być takie same!";
    }

    const result = await register(userData);
    if(result !== null){
        return result;
    }

    return redirect('/login');
}

export default function LoginPage(){
    const fetcher = useFetcher();
    const error = fetcher.data;
    return (
        <fetcher.Form method="post" className='login-form'>
            <h1>Rejestracja</h1>

            <label htmlFor='username'>Nazwa użytkownika:</label>
            <input type="text" name="username" id="username"/>

            <label htmlFor='username'>Nazwa kanału:</label>
            <input type="text" name="channelName" id="channelName"/>

            <label htmlFor='password'>Hasło:</label>
            <input type="password" name="password" id="password"/>

            <label htmlFor='password2'>Powtórz hasło:</label>
            <input type="password" name="password2" id="password2"/>

            <button type="submit">Zarejestruj się</button>
            
            {fetcher.state === 'submitting' && <img alt="loading" className='loader' src="./spinner.gif"/>}
            {error && <h2 className='error'>{error}</h2>}
            <span className='register-redirect'>
                Masz już konto? <Link to="/login">Zaloguj się</Link>
            </span>
        </fetcher.Form>
    );
}