import './ErrorElement.css';
import {
    useRouteError,
} from "react-router-dom";

export default function ErrorElement(){
    const error = useRouteError();

    console.error(error);
    return (
        <div className="error-element">
            <div className="error-element-inner">
                <h1>Wystąpił błąd!</h1>
                <i>Message: {error.status}: {error.data}</i>
            </div>
        </div>
    );
}