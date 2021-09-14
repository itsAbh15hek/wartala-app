import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import ChatTop from '../../components/dashboard/chat-window/top';
import Messages from '../../components/dashboard/chat-window/messages';
import ChatBottom from '../../components/dashboard/chat-window/bottom';
import { CurrentRoomProvider } from '../../context/current-room.context';

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();
  if (!rooms) {
    return (
      <Loader center vertical content="Loading..." speed="normal" size="md" />
    );
  }
  const currentRoom = rooms.find(room => room.id === chatId);
  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
  }

  const { name, description } = currentRoom;
  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom ">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
