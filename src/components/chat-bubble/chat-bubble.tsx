import { CSSProperties } from 'react';
import { Badge } from 'react-bootstrap';

interface ChatBubbleProps {

  imageUrl: string;
  chatContent: string;
  createdAt: number;
  ours: boolean;
}



const ChatBubble = (props: ChatBubbleProps) => {
  const { createdAt, chatContent, ours,imageUrl } = props;
  var date = new Date(createdAt * 1000);
  

  const bubbleStyle: CSSProperties = {
    // textAlign: ours ? 'right' : 'left',
    backgroundColor: ours ? '#0073aa' : 'white',
    padding: '10px',
    borderRadius: '10px',
    color: ours ? '#fff' : '#000',
    margin: ours ? '10px 0 10px auto' : '10px auto 10px 0',
    width: '100px',

  };
  const badgeStyle: CSSProperties = {
    position: 'relative',
    right: 0,
    opacity: .5,
    color: ours ? '#fff' : '#000',
    font: "10px/18px 'Helvetica Neue', Helvetica, Arial, sans-serif"
  }

  return (
    <div style={bubbleStyle}>
      {<div>{chatContent}</div>}
      {imageUrl && <img src={imageUrl} alt="Avatar" style={{ width: '100px', height: '100px' }} />}
      <span style={badgeStyle}>
        <Badge bg="secondary">{createdAt}</Badge>
      </span>
    </div>
  );
  
};

export default ChatBubble;
