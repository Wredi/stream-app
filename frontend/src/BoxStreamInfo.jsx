import './BoxStreamInfo.css';
import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

function BoxStreamInfo(props) {
    return (
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
                    <p>{props.userName}</p>
                </div>
            </div>
        </div>
    );
}
  
export default BoxStreamInfo;