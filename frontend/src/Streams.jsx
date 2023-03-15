import './Streams.css';

import {
  useLoaderData,
} from "react-router-dom";

import BoxStreamInfo from './BoxStreamInfo';

import { getStreams } from './utils';

export async function loader() {
  const activeStreams = await getStreams();
  return { activeStreams };
}

export default function Streams() {
  const { activeStreams } = useLoaderData();
  const displayStreams = activeStreams.map((stream, idx) => 
    <BoxStreamInfo
      key={idx} 
      title={stream.streamTitle} 
      channelName={stream.channelName} 
      userName={stream.channelName} 
      imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
    />
  );
  return (
    <div className='content'>
      <h1>Aktywne streamy</h1>
      <div className='streams'>
          <div className='streams-inner'>
              {displayStreams}
          </div>
      </div>
    </div>
  );
}