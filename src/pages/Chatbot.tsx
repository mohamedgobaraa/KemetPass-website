import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marked } from 'marked';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage('');
    setIsLoading(true);

    try {
      console.log('Sending request to chat endpoint...');
      const response = await fetch('http://localhost:5555/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: message,
          context: '' // You can add context if needed
        }),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      // Add bot response
      setMessages(prev => [...prev, { 
        text: data.response || t('chatbot.error'), 
        isUser: false 
      }]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, { 
        text: t('chatbot.error'), 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kemet-dark to-kemet-medium">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('chatbot.title')}
            </h1>
            <p className="text-xl text-kemet-light">
              {t('chatbot.subtitle')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="h-[500px] overflow-y-auto mb-6 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.isUser
                        ? 'bg-kemet-dark text-white'
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {msg.isUser ? (
                      msg.text
                    ) : (
                      <div 
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: marked(msg.text, { 
                            breaks: true,
                            gfm: true
                          }) 
                        }} 
                      />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/20 text-white rounded-lg p-4">
                    {t('chatbot.thinking')}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-kemet-light focus:outline-none focus:border-kemet-light"
              />
              <button
                type="submit"
                className="bg-kemet-dark hover:bg-kemet-dark/80 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {t('chatbot.send')}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chatbot;
