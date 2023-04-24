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
    
    const result = await sendApi('/post-session/', 'POST', userData);
    if(result !== null){
        return result;
    }

    return redirect('/');
}

export default function LoginPage(){
    const fetcher = useFetcher();
    const result = fetcher.data;

    return (
        <fetcher.Form method="post" className='login-form'>
            <h1>Logowanie</h1>

            <label htmlFor='email'>Adres email:</label>
            <input type="text" name="email" id="email"/>

            <label htmlFor='password'>Hasło:</label>
            <input type="password" name="password" id="password"/>

            <button type="submit">{fetcher.state === 'submitting' ? <Spinner size={30}/> : 'Zaloguj się'}</button>
            
            {result?.error && <ErrorMsg msg={result.error}/>}
            <span className='register-redirect'>
                Nie masz konta? <Link to="/register">Zarejestruj się</Link>
            </span>
        </fetcher.Form>
    );
}