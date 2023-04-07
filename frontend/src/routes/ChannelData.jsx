import '../css/InitStream.css';
import {
  useLoaderData,
  useFetcher,
  redirect
} from "react-router-dom";
import { loggedUserChannelData, logout, updateChannelData } from '../utils';

export async function loader() {
  const data = await loggedUserChannelData();
  if(data === null){
    return redirect('/login');
  }
  return { data };
}

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  
  const result = await updateChannelData(userData);
  return result;
}

async function logoutUser(){
  await logout();
  window.location.href = '/';
}

export default function InitStream() {
  const { data } = useLoaderData();
  const fetcher = useFetcher();
  const msg = fetcher.data;

  return (
    <div className='content-stream-data'>
        <fetcher.Form method="post">
            <label htmlFor="channelName">Nazwa kanału:</label>
            <textarea name="channelName" id="channelName" rows="3" required maxLength={40} minLength={10} defaultValue={data.channelName}></textarea>
            <label htmlFor="profileDescription">Opis kanału:</label>
            <textarea name="profileDescription" id="profileDescription" rows="8" required maxLength={1024} minLength={10} defaultValue={data.profileDescription}></textarea>
            <button type="submit">Zapisz</button>
            <button onClick={logoutUser}>Wyloguj się</button>
            {fetcher.state === 'submitting' && <img alt="loading" className='loader' src="./spinner.gif"/>}
            {msg?.error && <h2 className='error'>{msg.error}</h2>}
            {msg?.success && <h2 className='success'>{msg.success}</h2>}
        </fetcher.Form>
    </div>
  );
}