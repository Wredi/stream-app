import './InitStream.css';
import {
  useLoaderData,
  useFetcher,
} from "react-router-dom";

export async function loader() {
    const response = await fetch('http://localhost:8000/login/stream-data/', {credentials: 'include'})
        .catch(error => { 
            throw new Error(error);
        });

    const data = await response.json();
    if(!response.ok) {
        throw new Response(data.error, { status: response.status });
    }

    return { data };
}

export default function InitStream() {
  const { data } = useLoaderData();
  const fetcher = useFetcher();

  return (
    <div className='content'>
        <fetcher.Form method="post">
            <textarea name="title" id="title" cols="30" rows="10" required maxLength={255} minLength={10}>{data.title}</textarea>
            <textarea name="activityType" id="activityType" cols="30" rows="10" required maxLength={255} minLength={10}>{data.activityType}</textarea>
            <textarea name="streamDescription" id="streamDescription" cols="30" rows="10" required maxLength={255} minLength={10}>{data.streamDescription}</textarea>
        </fetcher.Form>
    </div>
  );
}