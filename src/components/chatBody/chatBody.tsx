import { useEffect, useState } from 'react';
import  ChatCard,{ChatCardProps } from '../chat-card/chat-card';

// import CardHeader from 'react-bootstrap/esm/CardHeader';
import { ChatHeader } from '../chat-header/chat-header';

interface ChatBodyProps {
  url: string;
}



function ChatBody({url }: ChatBodyProps) {
  const [cardData, setData] = useState<any>([]);
  const [cards, setCards] = useState<Array<JSX.Element>>([]);
  const [cardsQuantity, setCardsQuantity] = useState<number>(1);

  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        const { all_count } = json.meta;
        setCardsQuantity(all_count);
        setData(json.payload);
        console.log(json.payload); // <-- Log the response
      } catch (error) {
        console.error(error);
      }
    };
    
    makeAPICall()
  }, [cardData, cardsQuantity]);
  
 
  
  useEffect(() => {
    const newCards = [];
    if (cardsQuantity && cardData.length > 0) { // add checks to ensure all_count and cardData exist
      console.log("Messages [0]",cardData);
      
      for (let i = 0; i < cardsQuantity; i++) {
        if (cardData[i] && cardData[i].messages && cardData[i].messages.length > 0) { // add a check to ensure messages exist
          const cardProps: ChatCardProps = { key: i, text: cardData[i].messages[0].content, userName: cardData[i].meta.sender.name, chatId: `${i}` };
          newCards.push(<ChatCard {...cardProps} />);
        }
      }
      setCards(newCards);
    }
  }, [cardData, cardsQuantity]);
  

  return (
    <div>
      <ChatHeader></ChatHeader>
      {cards}
    
    </div>
  );
}


export default ChatBody;
