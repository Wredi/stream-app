import './Streams.css';

import {
  useLoaderData,
} from "react-router-dom";

import BoxStreamInfo from './BoxStreamInfo';
import { useState } from 'react';

import { getStreams } from './utils';

export async function loader() {
  const activeStreams = await getStreams();
  return { activeStreams };
}

function generateExampleBoxStreamInfo() {
  const data = [
    { title: 'Live Coding with React', channelName: 'Reactify', userName: 'john_doe' },
    { title: 'Playing Valorant', channelName: 'ValoFan', userName: 'jane_smith' },
    { title: 'Chess Tournament Finals', channelName: 'ChessMaster', userName: 'peter_wong' },
    { title: 'Creating Art on Stream', channelName: 'ArtisticMind', userName: 'sarah_baker' },
    { title: 'Gaming Marathon for Charity', channelName: 'CharityGaming', userName: 'mark_johnson' },
    { title: 'Cooking Show: Italian Cuisine', channelName: 'ChefNico', userName: 'nicole_adams' },
    { title: 'Fitness Stream: Yoga', channelName: 'YogaWithMe', userName: 'julie_garcia' },
    { title: 'Live Music Performance', channelName: 'MusicMania', userName: 'alex_smith' },
    { title: 'Traveling to Japan', channelName: 'JourneyToJapan', userName: 'david_kim' },
    { title: 'Speedrunning Super Mario Bros.', channelName: 'MarioFanatic', userName: 'lisa_tan' },
    { title: 'Painting and Sketching', channelName: 'ArtLover', userName: 'tom_lee' },
    { title: 'League of Legends Match', channelName: 'LolMaster', userName: 'harry_potter' },
    { title: 'React Native Workshop', channelName: 'ReactNativeDev', userName: 'megan_carter' },
    { title: 'Exploring Nature', channelName: 'NatureLover', userName: 'jack_white' },
    { title: 'Gaming Talk Show', channelName: 'GameOn', userName: 'jason_fernandez' },
    { title: 'Fashion and Beauty Stream', channelName: 'BeautyQueen', userName: 'amanda_clark' },
  ];

  const boxStreamInfoList = [];
  for (let i = 0; i < 16; i++) {
    const item = data[Math.floor(Math.random() * data.length)];
    boxStreamInfoList.push(
      <BoxStreamInfo
        key={i}
        title={item.title}
        channelName={item.channelName}
        userName={item.userName}
        imgLink={`https://picsum.photos/180/120?random=${i}`}
      />
    );
  }

  return boxStreamInfoList;
}
const test = generateExampleBoxStreamInfo();

export default function Streams() {
  const { activeStreams } = useLoaderData();
  const [query, setQuery] = useState("");

  const displayStreams = activeStreams.map((stream, idx) => 
    <BoxStreamInfo
      key={idx} 
      title={stream.streamTitle} 
      channelName={stream.channelName} 
      userName={stream.channelName} 
      imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"
    />
  );

  let test2 = test.filter((stream) => stream.props.channelName.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className='content'>
      <h1>Aktywne streamy</h1>
      <div className='query-box'>
        <label htmlFor="query">Szukaj:</label>
        <input id="query" type="text" onChange={e => setQuery(e.target.value)} />
      </div>
      <div className='streams'>
          <div className='streams-inner'>
              {test2}
          </div>
      </div>
    </div>
  );
}