import SiteNavbar from './SiteNavbar';
// import ReactHlsPlayer from 'react-hls-player';
import './Root.css'
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div style={{height: "3000px"}}>
      <SiteNavbar/>
      <Outlet/>
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

export default Root;