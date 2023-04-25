import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ChatBubble from '../chat-bubble/chat-bubble';


interface ChatContentURL {
  url: string;
}

interface ChatMessage {
  chatContent: string;
  createdAt: number;
  ours: boolean;
}

const ChatContent = ({ url }: ChatContentURL) => {
  const chatId = useParams<{ chatId: string }>();
  url = url + (parseInt(chatId.chatId)+1).toString + '/messages';
  console.log("url", url)
  const [userData, setUserData] = useState<any | null>(null);
  // const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  // const [message, setMessage] = useState('');
  const [createdAtMessage, setCreatedAt] = useState<Date>();

  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await fetch(url);
        const response_json = await response.json();

        const { meta, payload } = response_json["payload"];

        const message = new Map();
        console.log("payload", payload);
        for (const [key, value] of Object.entries(payload)) {
          message.set(key, value);
        }
        console.log("message", message);

      } catch (error) {
        console.log(error)
        console.error(error);
      }
    };

    makeAPICall().then((response) => {
      console.log('done');

    });
  }, []);

  return (
    <>
      <Link to={`/`}><ChevronLeft style={{ cursor: 'pointer' }} /></Link> {userData}



      <div style={{ height: '200px', overflowY: 'scroll' }}>
        {/* {chatMessages.map((message) => (
          <ChatBubble
            // createdAt=createdAt
            chatContent={message.chatContent}
            ours={message.ours}
          />
        ))} */}
      </div>

      {chatId.chatId}
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default ChatContent;
