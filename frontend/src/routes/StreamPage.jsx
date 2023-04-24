import { useLoaderData } from "react-router-dom";
import StreamWindow from '../components/StreamWindow';
import LiveChat from '../components/LiveChat';
import { queryApi, STREAM_URL } from '../utils';
import '../css/StreamPage.css';

export async function loader({ params }) {
  const data = await queryApi(`/users/${params.username}/full-info/`);
  if(data?.error) {
    throw new Response(data.error, { status: data.status });
  }
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
          <StreamWindow src={`${STREAM_URL}/${data.username}.m3u8`}/>
        </div>
        <div className='stream-info-box'>
          <div className='profile-pic'>
            <img src="https://wallpapers.com/images/hd/cat-with-shades-cool-picture-lkenou4wsqrbib37.jpg" alt="cat" />
          </div>
          <div className='data'>
            <h1 className='channel-name'>{data.username}</h1>
            <h1 className='stream-title'>{data.stream.title}</h1>
            <p className='stream-description'>{data.stream.streamDescription}</p>
          </div>
        </div>
      </div>
      <div className='right'>
        <LiveChat streamerUsername={data.username}/>
      </div>
    </div>
  );
}