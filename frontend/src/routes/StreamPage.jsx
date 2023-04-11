import '../css/InitStream.css';
import {
  useLoaderData,
} from "react-router-dom";
import StreamWindow from '../components/StreamWindow';
import { getStreamDataByUsername } from '../utils';

export async function loader({ params }) {
  const data = await getStreamDataByUsername(params.username);
  return { data };
}

export default function StreamPage() {
  const { data } = useLoaderData();

  return (
    <div className='stream-watch-box'>
        <StreamWindow src='http://localhost:8080/hls/witaj.m3u8'/>
        <p>{data.title}</p>
        <p>{data.activityType}</p>
        <p>{data.streamDescription}</p>
    </div>
  );
}