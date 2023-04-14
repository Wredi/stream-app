import { useState, useRef, useEffect } from 'react';

export default function LiveChat({ streamerUsername }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnectionOpen, setConnectionOpen] = useState(false);
  const ws = useRef();

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${streamerUsername}/`);

    ws.current.onopen = () => {
      console.log("Connection opened");
      setConnectionOpen(true);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setMessages((_messages) => [..._messages, data]);
    };

    return () => {
      console.log("Cleaning up...");
      ws.current.close();
    };
  }, [])

  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    ws.current.send(
      JSON.stringify({
        'message': newMessage
      })
    );
    setNewMessage('');
  };

  return (
    <div className='live-chat'>
      <h2 className='chat-title'>Live Chat</h2>
      <div className='chat-box'>
        {messages.map((message, index) => (
          <p key={index} className={'chat-message'}>
            <span className='message-username'>{message.username === '' ? "anonim" : message.username}: </span>{message.message}
          </p>
        ))}
      </div>
      <div className='chat-input-box'>
        <input
          type='text'
          placeholder='Type your message here...'
          className='chat-input'
          value={newMessage}
          onChange={handleNewMessage}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}