import { CSSProperties } from 'react';
import { Badge } from 'react-bootstrap';

interface ChatBubbleProps {
  
  
  chatContent: string;
  createdAt: number;
  ours: boolean;
}



const ChatBubble = (props: ChatBubbleProps) => {
  const {  createdAt, chatContent, ours } = props;
  var date = new Date(createdAt*  1000);

  const bubbleStyle: CSSProperties = {
    // textAlign: ours ? 'right' : 'left',
    backgroundColor: ours ? '#0073aa' : 'white',
    padding: '10px',
    borderRadius: '10px',
    color: ours ? '#fff' : '#000',
    margin: ours ? '10px 0 10px auto' : '10px auto 10px 0',
    width: '100px',
    
  };

  return (
    <div style={bubbleStyle}>
      
      <div>Chat Content: {chatContent}</div>
   
      {/* <Badge variant="secondary" className="text-muted">{createdAt}</Badge> */}
    </div>
  );
};

export default ChatBubble;
