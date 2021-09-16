import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../ProfileAvatar';

const RoomItem = ({ room }) => {
  const { createdAt, name, lastMessage } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>
        <TimeAgo
          datetime={
            lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)
          }
          className="font-formal text-black-45"
        />
      </div>
      <div>
        <span className="d-flex align-item-center text-black-70">
          {lastMessage ? (
            <>
              <div className="d-flex align-item-center">
                <ProfileAvatar
                  src={lastMessage.author.avatar}
                  name={lastMessage.author.name}
                  sixe="sm"
                />
              </div>
              <div className="text-disappear ml-2">
                <div className="italic">{lastMessage.author.name}</div>
                <span>
                  {lastMessage.text ||
                    `${lastMessage.file.contentType
                      .slice(lastMessage.file.contentType.indexOf('/') + 1)
                      .toUpperCase()} File`}
                </span>
              </div>
            </>
          ) : (
            <span>No messages yet...</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default RoomItem;
