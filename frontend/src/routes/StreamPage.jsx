import { useLoaderData } from "react-router-dom";
import StreamWindow from '../components/StreamWindow';
import LiveChat from '../components/LiveChat';
import { getUserDataByUsername } from '../utils';
import '../css/StreamPage.css';

export async function loader({ params }) {
  const data = await getUserDataByUsername(params.username);
  return { data };
}

export default function StreamPage() {
  const { data } = useLoaderData();
  console.log(data);
  // const activity = data.activityType;

  return (
    <div className='stream-page'>
      <div className='left'>
        <div className='stream-watch-box'>
          <StreamWindow src='http://localhost:8080/hls/witaj.m3u8'/>
        </div>
        <div className='stream-info-box'>
          <div className='profile-pic'>
            <img src="https://wallpapers.com/images/hd/cat-with-shades-cool-picture-lkenou4wsqrbib37.jpg" alt="cat" />
          </div>
          <div className='data'>
            <h1 className='channel-name'>{data.channel.channelName}</h1>
            <h1 className='stream-title'>{data.stream.title}</h1>
            <p className='stream-description'>{data.stream.streamDescription}</p>
          </div>
        </div>
      </div>
      <div className='right'>
        <LiveChat />
      </div>
    </div>
  );
}