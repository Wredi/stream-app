import '../css/InitStream.css';
import {
  useLoaderData,
  useFetcher,
  redirect
} from "react-router-dom";
import { queryApi, sendApi, updateChannelData } from '../utils';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

export async function loader() {
  const data = await queryApi('/users/me/channel/');
  if(data?.error && data.status === 401){
    return redirect('/login');
  }

  if(data?.error){
    throw new Response(data.error, { status: data.status });
  }

  return { data };
}

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  return await sendApi('/users/me/channel-update/', 'PUT', userData);
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
            <button type="submit">{fetcher.state === 'submitting' ? <Spinner size={30}/> : 'Zapisz'}</button>
            
            {msg === null && <ErrorMsg msg={"Pomyślnie zaktualizowano dane użytkownika"} color={'#00ff00'}/>}
            {msg?.error && <ErrorMsg msg={msg.error}/>}
        </fetcher.Form>
    </div>
  );
}