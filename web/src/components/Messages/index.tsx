import React, { useEffect, useState } from "react";
import { useSubscription, gql } from "@apollo/client";

// import { Container } from './styles';

interface IMessage {
  id: number;
  userId: number;
  content: string;
}

const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    messageAdded {
      id
      userId
      content
    }
  }
`;

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data } = useSubscription(MESSAGES_SUBSCRIPTION);

  useEffect(() => {
    if (data) {
      const { messageAdded } = data;
      setMessages((oldMessages) => [...oldMessages, messageAdded]);
    }
  }, [data]);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
