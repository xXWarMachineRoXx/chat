import { useEffect, useState } from 'react';
import  ChatCard,{ChatCardProps } from '../chat-card/chat-card';

interface ChatBodyProps {
  // match: any;
  url: string;
}

function ChatBody({url }: ChatBodyProps) {
  const [cardData, setData] = useState<any>([]);
  const [cards, setCards] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
          // If all_count has changed, update the previous value and make the API call
          setData(json.data);
        
       
      } catch (error) {
        console.error(error);
      }
    };
    makeAPICall().then((response) => {
      console.log('done');
      console.log(cardData);
      console.log(response)
    })
    
  }, []);
  
  
  useEffect(() => {
    const newCards = [];
    for (let i = 0; i < cardData.meta.all_count; i++) {
      const cardProps: ChatCardProps = { key: i,text: cardData.payload.messages.content, userName: cardData.payload.meta.name,chatId: `${i}` };
      newCards.push(<ChatCard {...cardProps} />);
    }
    setCards(newCards);
  }, []);

  return (
    <div>
      {cards}
    </div>
  );
}


export default ChatBody;
