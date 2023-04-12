import { useLoaderData } from "react-router-dom";
import StreamWindow from '../components/StreamWindow';
import LiveChat from '../components/LiveChat';
import { getStreamDataByUsername } from '../utils';
import '../css/StreamPage.css';

export async function loader({ params }) {
  const data = await getStreamDataByUsername(params.username);
  return { data };
}

export default function StreamPage() {
  const { data } = useLoaderData();
  const streamTitle = data.title;
  const streamDescription = data.streamDescription;
  // const activity = data.activityType;

  return (
    <div className='stream-page'>
      <div className='left'>
        <div className='stream-watch-box'>
          <StreamWindow src='http://localhost:8080/hls/witaj.m3u8'/>
        </div>
        <div className='stream-info-box'>
          <h1 className='stream-title'>{streamTitle}</h1>
          <p className='stream-description'>{streamDescription}</p>
        </div>
      </div>
      <div className='right'>
        <LiveChat />
      </div>
    </div>
  );
}