import './LoginPage.css';
import {
    Form,
    redirect,
    useFetcher,
} from "react-router-dom";
import {login} from './utils.js';

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
    const error = fetcher.data;
    return (
        <fetcher.Form method="post" className='login-form'>
            <h1>Logowanie</h1>

            <label htmlFor='username'>Nazwa użytkownika:</label>
            <input type="text" name="username" id="username"/>

            <label htmlFor='password'>Hasło:</label>
            <input type="password" name="password" id="password"/>

            <button type="submit">Zaloguj się</button>
            {error && <h2 className='error'>{error}</h2>}
        </fetcher.Form>
    );
}