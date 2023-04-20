import classNames from 'classnames';
import styles from './chatBody.module.scss';
import { CardGroup, Card } from 'react-bootstrap';
import ChatCard from '../chat-card/chat-card';
import axios from "axios";
import React, { useState, useEffect } from "react";


function ChatBody() {
  const [cardData, setData] = useState<any>({ all_count: 0 });
  const [prevAllCount, setPrevAllCount] = useState<number | null>(null);
  const [cards, setCards] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await fetch('http://localhost:8081/cors');
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
  }, [cardData.all_count, prevAllCount]);
  
  useEffect(() => {
    const newCards = [];
    for (let i = 0; i < cardData.all_count; i++) {
      newCards.push(<ChatCard key={i} text={`Oh no! ${i}`} userName={`Robert ${i+1}`}></ChatCard>);
    }
    setCards(newCards);
  }, [cardData.all_count]);

  return (
    <div>
      {cards}
      {cardData.all_count}
    </div>
  );
}

{/* <CardGroup>
{/* <ChatCard text="Oh no!" userName='Robert'></ChatCard>
<ChatCard text="Can you help me with this" userName='Julia'></ChatCard>
<ChatCard text="My Laptop is not working 😢" userName='Soba'></ChatCard>
<ChatCard text="What do I do now?" userName='Chang'></ChatCard>
<ChatCard text="Server Down !!!" userName='Somnam'></ChatCard>
{cardData.map((item, index) => (
<li key={index}>{item}</li>
))}

javascript
Copy code
</CardGroup> */}
// useEffect(() => {

// let config = {
// method: 'get',
// maxBodyLength: Infinity,
// url: 'http://localhost:8081',

// };

// axios.request(config)
// .then((response) => {
// console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
// console.log(error);
// });

// });

// console.log(cardData);

// return (

// <CardGroup>
// <ChatCard text="Oh no!" userName='Robert'></ChatCard>
// <ChatCard text="Can you help me with this" userName='Julia'></ChatCard>
// <ChatCard text="My Laptop is not working 😢" userName='Soba'></ChatCard>
// <ChatCard text="What do I do now?" userName='Chang'></ChatCard>
// <ChatCard text="Server Down !!!" userName='Somnam'></ChatCard>
// {cardData.map((item, index) => (
// <li key={index}>{item}</li>
// ))}

// </CardGroup>
// )
// }

export default ChatBody