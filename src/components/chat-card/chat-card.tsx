import React from 'react'
import { Card } from 'react-bootstrap';
import styles from './chat-card.module.scss';
import { PersonCircle } from 'react-bootstrap-icons'
interface ChatCardProps {
  text: string;
userName: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ text,userName }) => {
  return (
    <Card className={styles.chatCard}>
      <Card.Body className={styles.chatCardBody}>
        <Card.Title className={styles.chatCardTitle}>
            <PersonCircle></PersonCircle> {userName}
        </Card.Title>
        <Card.Text className={styles.chatCardText}>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ChatCard;
