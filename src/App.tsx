import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatContent from './components/chat-content/chat-content'
import ChatBody from './components/chatBody/chatBody';


function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route path="/" element={<ChatBody url='http://localhost:8081/conversations/' />} />
          <Route path="/chat/:chatId" element={<ChatContent url='http://localhost:8081/conversations/2/messages' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
