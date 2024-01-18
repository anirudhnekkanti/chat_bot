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
      // Simulate sending the user message and receiving a bot response
      const botResponse = await simulateBotResponse(message);

      // Update the chat with the user's message and bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: message, sender: 'user' },
        { id: Date.now() + 1, text: botResponse, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  const simulateBotResponse = async (userMessage) => {
    // Add your logic here to generate a response based on user input
    // Replace this with the desired behavior of your chatbot
    if (userMessage.toLowerCase() === 'hello') {
      return "Hello! How can I help you?";
    } else if (userMessage.toLowerCase() === 'bye') {
      return "Goodbye! Have a great day!";
    } else {
      return "I'm sorry, I didn't understand that.";
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
            <p>{msg.text}</p>
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
