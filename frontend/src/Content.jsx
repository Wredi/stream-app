import './Content.css';

import BoxStreamInfo from './BoxStreamInfo';

function Content() {
  return (
    <div className='content'>
      <h1>Aktywne streamy</h1>
      <div className='streams'>
          <div className='streams-inner'>
              <BoxStreamInfo title="[LIVE] Gramy w apex! Wpadaj na stream!" userName="piotr222" 
              imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"/>
              <BoxStreamInfo title="[LIVE] Gramy w apex! Wpadaj na stream!" userName="piotr222" 
              imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"/>
              <BoxStreamInfo title="[LIVE] Gramy w apex! Wpadaj na stream!" userName="piotr222" 
              imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"/>
          </div>
      </div>
    </div>
  );
}

export default Content;