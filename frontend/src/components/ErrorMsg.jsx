import '../css/ErrorMsg.css';

export default function ErrorMsg({msg, color}){
    return (
        <div className="error-msg" style={{backgroundColor: color}}>
            <h4 className="error-msg__text">{msg}</h4>
        </div>
    );
}