import SiteNavbar from './SiteNavbar';
import Content from './Content';
import ReactHlsPlayer from 'react-hls-player';
import './App.css'

function App() {
  return (
    <div style={{height: "4000px"}}>
      <SiteNavbar/>
      <Content/>
    </div>
    /*make video hls player*/
    // <div>
    //   <ReactHlsPlayer
    //     src="http://localhost:8080/hls/witaj.m3u8"
    //     autoPlay={false}
    //     controls={true}
    //     width="100%"
    //     height="auto"
    //   />
    // </div>
  );
}

export default App;