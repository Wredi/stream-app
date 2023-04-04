import SiteNavbar from '../components/SiteNavbar';
// import ReactHlsPlayer from 'react-hls-player';
import '../css/Root.css'
import { Outlet, useLoaderData } from "react-router-dom";
import {isUserLogged} from '../utils.js';

export async function loader() {
  const isLogged = await isUserLogged();
  return { isLogged };
}

function Root() {
  const { isLogged } = useLoaderData();
  return (
    <div style={{height: "3000px"}}>
      <SiteNavbar isLogged={isLogged}/>
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