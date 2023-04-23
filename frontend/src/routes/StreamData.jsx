import '../css/InitStream.css';
import {
  useLoaderData,
  useFetcher,
  redirect
} from "react-router-dom";
import { queryApi, sendApi } from '../utils';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

export async function loader() {
  const data = await queryApi('/users/me/stream/');
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
  return await sendApi('/users/me/stream-update/', 'PUT', userData);
}

export default function StreamData() {
  const { data } = useLoaderData();
  const fetcher = useFetcher();
  const msg = fetcher.data;

  return (
    <div className='content-stream-data'>
        <fetcher.Form method="post">
            <label htmlFor="title">Tytuł:</label>
            <textarea name="title" id="title" rows="8" required maxLength={255} minLength={10} defaultValue={data.title}></textarea>
            <label htmlFor="activityType">Rodzaj aktywności:</label>
            <textarea name="activityType" id="activityType" rows="8" required maxLength={50} minLength={10} defaultValue={data.activityType}></textarea>
            <label htmlFor="streamDescription">Opis:</label>
            <textarea name="streamDescription" id="streamDescription" rows="8" required maxLength={1024} minLength={10} defaultValue={data.streamDescription}></textarea>
            <button type="submit">{fetcher.state === 'submitting' ? <Spinner size={30}/> : 'Zapisz'}</button>

            {msg === null && <ErrorMsg msg={"Pomyślnie zaktualizowano dane"} color={'#00ff00'}/>}
            {msg?.error && <ErrorMsg msg={msg.error}/>}
        </fetcher.Form>
    </div>
  );
}