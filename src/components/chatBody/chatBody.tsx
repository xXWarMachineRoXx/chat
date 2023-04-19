

import classNames from 'classnames';
import styles from './chatBody.module.scss';
import { CardGroup,Card } from 'react-bootstrap';
import ChatCard from '../chat-card/chat-card';
import axios from "axios";
import React, { useState, useEffect } from "react";

export interface ChatBodyProps {
  className?: string;
}


const ChatBody = ({ className }: ChatBodyProps) => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const options = {
        headers: {
          'Authorization': '3QnqCzmLdSTYJFFSjuriLXC5'
        }
      };
      const result = await axios.get('https://app.chatwoot.com/api//v1/accounts/81256/conversations?status=open&sort_by=last_activity_at', options);
      setCardData(result.data);
    };
    fetchAPI();
  }, []);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const options = {
          headers: {
            'Authorization': '3QnqCzmLdSTYJFFSjuriLXC5'
          }
        };
        const result = await axios.get('https://app.chatwoot.com/api//v1/accounts/81256/conversations?status=open&sort_by=last_activity_at', options);
        console.log(result.data); // log response data to console
        setCardData(result.data);
      } catch (error) {
        console.log(error); // log any errors to console
      }
    };
    fetchAPI();
  }, []);
  
  console.log(cardData);

  return (
 
    <CardGroup>
      <ChatCard text="Oh no!" userName='Robert'></ChatCard>
      <ChatCard text="Can you help me with this" userName='Julia'></ChatCard>
      <ChatCard text="My Laptop is not working 😢" userName='Soba'></ChatCard>
      <ChatCard text="What do I do now?" userName='Chang'></ChatCard>
      <ChatCard text="Server Down !!!" userName='Somnam'></ChatCard>
      {cardData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}

    </CardGroup>
  )
}

export default ChatBody