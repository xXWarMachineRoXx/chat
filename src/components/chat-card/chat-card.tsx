import React from 'react';
import { Card } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styles from './chat-card.module.scss';

export interface ChatCardProps {
  key: number;
  text: string;
  userName: string;
  chatId: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ text, userName, chatId }) => {
  const to = `/chat/${chatId}`;

  return (
    <Link to={to}>
      <Card className={styles.chatCard} style={{ width: '18rem', margin: '1rem' }}>
        <Card.Body className={styles.chatCardBody}>
          <Card.Title className={styles.chatCardTitle}>
            <PersonCircle /> {userName}
          </Card.Title>
          <Card.Text className={styles.chatCardText}>{text}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ChatCard;
