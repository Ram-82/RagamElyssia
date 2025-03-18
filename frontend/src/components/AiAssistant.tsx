import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Hello! I\'m your Elyssia AI Assistant. How can I help you with our luxury event planning or concierge services today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: inputText }]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that. Could you provide more details about your event requirements?",
        "Absolutely! Our luxury event planning service can accommodate that request. Would you like to schedule a consultation?",
        "Thank you for your interest. Our team specializes in creating personalized experiences. May I have your contact information to have a specialist reach out to you?",
        "Of course! Ragam Elyssia offers exclusive access to premium venues and experiences. Would you like more information about our concierge services?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { sender: 'assistant', text: randomResponse }]);
    }, 1000);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-lg hover:bg-gold/80 transition duration-300"
      >
        <i className={`ri-${isOpen ? 'close' : 'customer-service-2'}-line text-black text-2xl`}></i>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-black border border-gold/30 rounded-lg shadow-2xl w-80 md:w-96 absolute bottom-20 right-0 overflow-hidden"
          >
            <div className="p-4 border-b border-gold/20 flex justify-between items-center bg-gradient-to-r from-black to-black">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                  <i className="ri-robot-line text-gold"></i>
                </div>
                <div>
                  <h3 className="text-pearl text-sm font-medium">Elyssia AI Assistant</h3>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                    <span className="text-xs text-silver">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-silver hover:text-pearl"
              >
                <i className="ri-subtract-line"></i>
              </button>
            </div>
            
            <div className="bg-black h-80 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex items-start mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
                >
                  {message.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mr-3 shrink-0">
                      <i className="ri-robot-line text-gold text-sm"></i>
                    </div>
                  )}
                  <div className={`${message.sender === 'assistant' ? 'bg-black-light' : 'bg-gold/20'} rounded-lg p-3 max-w-[85%]`}>
                    <p className="text-pearl text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gold/20 bg-black">
              <div className="flex items-center">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-black border border-gold/30 text-pearl px-4 py-2 rounded-l focus:outline-none focus:border-gold text-sm" 
                  placeholder="Type your message..."
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-gold text-black px-4 py-2 rounded-r hover:bg-gold/80 transition duration-300"
                >
                  <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiAssistant;
