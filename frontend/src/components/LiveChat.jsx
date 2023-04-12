import { useState, useRef, useEffect } from 'react';

export default function LiveChat({ username }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, { username, message: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className='live-chat'>
      <h2 className='chat-title'>Live Chat</h2>
      <div className='chat-box' ref={chatBoxRef}>
        {messages.map((message, index) => (
          <p key={index} className={`chat-message ${message.username === username ? 'current-user' : ''}`}>
            <span className='message-username'>{message.username}: </span>{message.message}
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