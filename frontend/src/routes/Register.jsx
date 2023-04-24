import '../css/Login.css';
import {
    Link,
    redirect,
    useFetcher,
} from "react-router-dom";
import {sendApi} from '../utils.js';
import ErrorMsg from '../components/ErrorMsg';
import Spinner from '../components/Spinner';

export async function action({ request }) {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    
    if(userData.password !== userData.password2){
        return {error: "Oba hasła muszą być takie same!"};
    }

    const result = await sendApi('/users/new/', 'POST', userData);
    if(result !== null){
        return result;
    }

    return redirect('/login');
}

export default function LoginPage(){
    const fetcher = useFetcher();
    const result = fetcher.data;
    return (
        <fetcher.Form method="post" className='login-form'>
            <h1>Rejestracja</h1>

            <label htmlFor='username'>Nazwa użytkownika:</label>
            <input type="text" name="username" id="username"/>

            <label htmlFor='email'>Email:</label>
            <input type="text" name="email" id="email"/>

            <label htmlFor='password'>Hasło:</label>
            <input type="password" name="password" id="password"/>

            <label htmlFor='password2'>Powtórz hasło:</label>
            <input type="password" name="password2" id="password2"/>

            <button type="submit">{fetcher.state === 'submitting' ? <Spinner size={30}/> : 'Zarejestruj się'}</button>
            
            {result?.error && <ErrorMsg msg={result.error}/>}
            <span className='register-redirect'>
                Masz już konto? <Link to="/login">Zaloguj się</Link>
            </span>
        </fetcher.Form>
    );
}