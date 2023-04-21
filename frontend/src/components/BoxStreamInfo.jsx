import '../css/BoxStreamInfo.css';
import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { NavLink } from 'react-router-dom';

function BoxStreamInfo(props) {
    return (
        <NavLink to={`/stream/${props.userName}`} className='stream-info-link'>
            <div className='stream-info' onClick={() => console.log("HUHUHUUHUHUHHHHHHHH!")}>
                <div>
                    <img src={props.imgLink} alt="jajoc" />
                </div>
                <div>
                    <p>{props.title}</p>
                </div>
                <div className='streamer-profile'>
                    <div>
                        <IconContext.Provider value={{ className: "shared-class", size: 20 }}>
                            <FaUserAlt/>
                        </IconContext.Provider>
                    </div>
                    <div>
                        <p>{props.channelName}</p>
                    </div>
                </div>
            </div>
        </NavLink>
    );
}
  
export default BoxStreamInfo;