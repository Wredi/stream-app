import './Content.css';

import BoxStreamInfo from './BoxStreamInfo';

function Content() {
  return (
    <div className='content'>
        <div className='content-inner'>
            <BoxStreamInfo title="[LIVE] Gramy w apex! Wpadaj na stream!" userName="piotr222" 
            imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"/>
            <BoxStreamInfo title="[LIVE] Gramy w apex! Wpadaj na stream!" userName="piotr222" 
            imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"/>
            <BoxStreamInfo title="[LIVE] Gramy w apex! Wpadaj na stream!" userName="piotr222" 
            imgLink="https://i.ytimg.com/vi/UPtoIy-oPWQ/maxresdefault.jpg"/>
        </div>
    </div>
  );
}

export default Content;