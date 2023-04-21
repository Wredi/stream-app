import '../css/Login.css';
import {
    Link,
    redirect,
    useFetcher,
    useLocation
} from "react-router-dom";
import {login} from '../utils.js';
import ErrorMsg from '../components/ErrorMsg';
import Spinner from '../components/Spinner';

export async function action({ request }) {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    
    const result = await login(userData);
    if(result !== null){
        return result;
    }

    return redirect('/');
}

export default function LoginPage(){
    const fetcher = useFetcher();
    const {state} = useLocation();

    const error = fetcher.data || state?.error;
    return (
        <fetcher.Form method="post" className='login-form'>
            <h1>Logowanie</h1>

            <label htmlFor='username'>Nazwa użytkownika:</label>
            <input type="text" name="username" id="username"/>

            <label htmlFor='password'>Hasło:</label>
            <input type="password" name="password" id="password"/>

            <button type="submit">{fetcher.state === 'submitting' ? <Spinner size={30}/> : 'Zaloguj się'}</button>
            
            {error && <ErrorMsg msg={error}/>}
            <span className='register-redirect'>
                Nie masz konta? <Link to="/register">Zarejestruj się</Link>
            </span>
        </fetcher.Form>
    );
}