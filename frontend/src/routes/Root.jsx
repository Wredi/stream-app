import SiteNavbar from '../components/SiteNavbar';
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
  );
}

export default Root;