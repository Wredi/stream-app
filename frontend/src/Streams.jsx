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
              {/* {displayStreams} */}
              <BoxStreamInfo
                key={0} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={1} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={2} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={3} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={4} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={5} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={6} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={7} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={8} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={9} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={10} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={11} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={12} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={13} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={14} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
              <BoxStreamInfo
                key={15} 
                title="{stream.streamTitle} "
                channelName="{stream.channelName} "
                userName="{stream.channelName} "
                imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
              />
          </div>
      </div>
    </div>
  );
}