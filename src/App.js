import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const ChatbotComponent = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello user! How can I assist you today?', sender: 'bot' },
  ]);

  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      return; // Do not send empty messages
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      // Check if the response contains an image URL
      const isImage = result.message.includes('.png');

      // Update the chat with the user's message and bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: message, sender: 'user' },
        { id: Date.now() + 1, text: result.message, sender: 'bot', isImage },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="message-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble ${msg.sender}-bubble`}>
            {msg.isImage ? (
              <img src={msg.text} alt="Chart" />
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
