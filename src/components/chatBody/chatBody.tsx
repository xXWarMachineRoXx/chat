import { useEffect, useState } from 'react';
import  ChatCard,{ChatCardProps } from '../chat-card/chat-card';

interface ChatBodyProps {
  // match: any;
  url: string;
}

function ChatBody({url }: ChatBodyProps) {
  const [cardData, setData] = useState<any>({ all_count: 0 });
  const [prevAllCount, setPrevAllCount] = useState<number | null>(null);
  const [cards, setCards] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (prevAllCount !== null && json.all_count !== cardData.all_count) {
          // If all_count has changed, update the previous value and make the API call
          setData(json);
          setPrevAllCount(json.all_count);
        } else {
          // Otherwise, only update the previous value
          setPrevAllCount(json.all_count);
        }
      } catch (error) {
        console.error(error);
      }
    };
    makeAPICall();
  }, [cardData.all_count, prevAllCount, url]);

  useEffect(() => {
    const newCards = [];
    for (let i = 0; i < cardData.all_count; i++) {
      const cardProps: ChatCardProps = { key: i,text: `Oh no! ${i}`, userName: `Robert ${i + 1}`,chatId: `${i}` };
      newCards.push(<ChatCard {...cardProps} />);
    }
    setCards(newCards);
  }, [cardData.all_count]);

  return (
    <div>
      {cards}
    </div>
  );
}


export default ChatBody;
