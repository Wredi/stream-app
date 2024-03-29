import '../css/Spinner.css';

export default function Spinner({size}){
    return (
        <div className="lds-ring" style={{width: `${size}px`, height: `${size}px`}}><div></div><div></div><div></div><div></div></div>
    );
}