import { useState } from 'react';


const FAQ_DATA = {
    "Where can I see the steps for uploading documents?": "Go to the dashboard, click the 'Upload' button and follow the on-screen instructions.",
    "Is the website free to use?": "Yes, we offer a free tier with basic features. Premium features are available with subscription.",
    "How many documents can I store in the wishlist?": "Free users can store up to 7 documents. Premium users get unlimited storage.",
    "Can I buy stocks with your website?": "No, we are a document management platform and don't offer stock trading services.",
    "If I take a subscription and don't need it anymore, can I get my money back?": "Yes, we offer a 30-day money-back guarantee for all subscriptions.",
    "How can I contact admin?": "You can reach admin through the 'Contact Us' form or email support@docsnavigator.com",
    "Is there any customer support available?": "Yes, we offer 24/7 customer support through chat and email.",
    "What types of documents can I upload?": "We support PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, and image files.",
    "How many files can I upload in the free version?": "Free version allows up to 7 document uploads.",
    "How do I upload a document?": "Click the 'Upload' button in your dashboard, select your file, and click 'Submit'.",
    "Can I replace an uploaded document?": "Yes, you can replace documents by selecting 'Replace' from the document options menu.",
    "How do I download my documents?": "Click the 'Download' icon next to any document in your dashboard.",
    "How do I add a bookmark to a document?": "Click the star icon next to any document to add it to your bookmarks.",
    "How can I upgrade to the premium version?": "Click 'Upgrade' in your profile menu and choose your preferred subscription plan.",
    "I'm unable to upload a file. What should I do?": "Check your file size and format. If issues persist, clear cache or contact support."
  };
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { text: query, isUser: true };
    
    const answer = Object.entries(FAQ_DATA).find(([question]) => 
      question.toLowerCase().includes(query.toLowerCase())
    )?.[1] || "I couldn't find an answer to that question. Please contact support for assistance.";
    
    const botMessage = { text: answer, isUser: false };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setQuery('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="bg-blue-500 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">Doc Navigator Help</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white text-2xl hover:text-gray-200"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center mt-4">
                Ask me anything about document management!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
                list="faq-suggestions"
              />
              <datalist id="faq-suggestions">
                {Object.keys(FAQ_DATA).map((question, idx) => (
                  <option key={idx} value={question} />
                ))}
              </datalist>
              <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Need Help?
        </button>
      )}
    </div>
  );
}
