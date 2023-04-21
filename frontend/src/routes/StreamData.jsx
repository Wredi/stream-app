import '../css/InitStream.css';
import {
  useLoaderData,
  useFetcher,
  redirect
} from "react-router-dom";
import { loggedUserStreamData, updateStreamData } from '../utils';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

export async function loader() {
  const data = await loggedUserStreamData();
  if(data === null){
    return redirect('/login');
  }
  return { data };
}

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  
  const result = await updateStreamData(userData);
  return result;
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

            {msg?.error && <ErrorMsg msg={msg.error}/>}
            {msg?.success && <ErrorMsg msg={msg.success} color={'#00ff00'}/>}
        </fetcher.Form>
    </div>
  );
}