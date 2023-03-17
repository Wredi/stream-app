import ReactHlsPlayer from 'react-hls-player';
import { useRef } from 'react';

function StreamSite() {
    const socket = new WebSocket("ws://localhost:8765");
    let messages = useRef([])

    const listItems = messages.current.map((message) => {
        <li>{message}</li>
    });

    socket.addEventListener("open", (event) => {
        let tableOfMessages = event.data;
        messages.current = tableOfMessages;
    });

    function handleClick() {
        let value = document.getElementById("sendText").value;
        messages.current.push(value);
        socket.send(messages.current);
    }

    return (
        <div>
            <div id="streamWindow">
                <ReactHlsPlayer
                    src="http://localhost:8080/hls/witaj.m3u8"
                    autoPlay={false}
                    controls={true}
                    width="50%"
                    height="auto"
                />
            </div>
            <div id="streamChat">
                <div id="chat">
                    {listItems}
                </div>
                <div id="input">
                    <input type="text" id="sendText" />
                    <button onClick={handleClick}>Wyślij</button>
                </div>
            </div>

        </div>
    );
}

export default StreamSite;