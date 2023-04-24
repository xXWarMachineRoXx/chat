import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatContent from './components/chat-content/chat-content'
import ChatBody from './components/chatBody/chatBody';
import { ChatHeader } from './components/chat-header/chat-header';

function App() {
  return (
    <>
      <ChatHeader />
      <Router>

        <Routes>
          <Route path="/" element={<ChatBody url='http://localhost:8081/conversations/meta' />} />
          <Route path="/chat/:chatId" element={<ChatContent url='http://localhost:8081/conversations/' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
