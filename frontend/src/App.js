import SiteNavbar from './SiteNavbar';
import Content from './Content';
import StreamSite from './StreamInside';
import ReactHlsPlayer from 'react-hls-player';
import './App.css'

function App() {
  return (
    /*<div style={{height: "4000px"}}>
      <SiteNavbar/>
      <Content/>
    </div>=*/
    /*make video hls player*/
    <div>
      <StreamSite />
    </div>
  );
}

export default App;