import './Streams.css';

import {
  useLoaderData,
} from "react-router-dom";

import BoxStreamInfo from './BoxStreamInfo';

const getStreams = async () => {
  try {
    const response = await fetch('http://localhost:8000/login/active-streams/');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('There was an error', error);
  }
};

export async function loader() {
  const activeStreams = await getStreams();
  return { activeStreams };
}

function Streams() {
  const { activeStreams } = useLoaderData();
  const mapowanie = activeStreams.map((stream, idx) => <BoxStreamInfo key={idx} title={stream.streamTitle} channelName={stream.channelName} userName={stream.channelName} imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"/>);
  return (
    <div className='content'>
      <h1>Aktywne streamy</h1>
      <div className='streams'>
          <div className='streams-inner'>
              {mapowanie}
          </div>
      </div>
    </div>
  );
}

export default Streams;