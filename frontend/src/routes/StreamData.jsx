import '../css/InitStream.css';
import {
  useLoaderData,
  useFetcher,
  redirect
} from "react-router-dom";
import { loggedUserStreamData, updateStreamData } from '../utils';

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
            <label htmlFor=""title>Tytuł:</label>
            <textarea name="title" id="title" rows="8" required maxLength={255} minLength={10} defaultValue={data.title}></textarea>
            <label htmlFor=""title>Rodzaj aktywności:</label>
            <textarea name="activityType" id="activityType" rows="8" required maxLength={50} minLength={10} defaultValue={data.activityType}></textarea>
            <label htmlFor=""title>Opis:</label>
            <textarea name="streamDescription" id="streamDescription" rows="8" required maxLength={1024} minLength={10} defaultValue={data.streamDescription}></textarea>
            <button type="submit">Zapisz</button>
            {fetcher.state === 'submitting' && <img alt="loading" className='loader' src="./spinner.gif"/>}
            {msg?.error && <h2 className='error'>{msg.error}</h2>}
            {msg?.success && <h2 className='success'>{msg.success}</h2>}
        </fetcher.Form>
    </div>
  );
}