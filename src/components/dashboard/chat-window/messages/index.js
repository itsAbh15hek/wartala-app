import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { database } from '../../../../misc/firebase';
import { transformToArrayWithId } from '../../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
  const [message, setMessage] = useState(null);
  const { chatId } = useParams();

  const isChatEmpty = message && message.length === 0;
  const canShowMessages = message && message.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');
    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrayWithId(snap.val());
        setMessage(data);
      });
    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet...</li>}
      {canShowMessages &&
        message.map(msg => <MessageItem key={msg.id} message={msg} />)}
    </ul>
  );
};

export default Messages;
