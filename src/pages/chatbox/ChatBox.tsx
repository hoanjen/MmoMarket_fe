import { Message, MessageSideBar } from '@api/chatbox/types';
import ChatArea from '@components/chatbox/ChatArea';
import SideBarChat from '@components/chatbox/SideBarChat';
import { useAppSelector } from '@stores/app/hook';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { socket } from '../../socket';
import { Socket } from 'socket.io-client';

export default function ChatBox() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('chat_to');
  const navigate = useNavigate();
  const [sideBarChatItem, setSideBarChatItem] = useState<null | MessageSideBar>(null);
  const [newMessageSocket, setNewMessageSocket] = useState<null | Message>(null);
  const user_id = useAppSelector((state) => state.user).id;
  const setSideBar = (item: MessageSideBar) => {
    setSideBarChatItem(item);
  };
  useEffect(() => {
    const socketClient = socket.connect();
    socketClient.on('message', (data) => {
      const topSidebar: MessageSideBar = {
        avatar: data.data.user?.avatar,
        username: data.data.user?.username,
        file_name: data.data.file_name,
        first_name: data.data.user?.first_name,
        group_id: data.data.group_id,
        group_name: data.data.group_name
          ? data.data.group_name
          : data.data.user.first_name + ' ' + data.data.user.last_name,
        id: data.data.id,
        last_name: data.data.user?.last_name,
        group_type: 'SINGLE',
        text: data.data.text,
        user_id: data.data.user_id,
        created_at: data.data.created_at,
      };

      setNewMessageSocket(data.data);
      setSideBar(topSidebar);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 border-gray-300 mx-52">
      <div className="col-span-1 pb-2">
        <SideBarChat user_id={user_id} chat_to={id} sideBarChatItem={sideBarChatItem}></SideBarChat>
      </div>
      <div className="col-span-2">
        <ChatArea newMessage={newMessageSocket} setSideBar={setSideBar} chat_to={id} user_id={user_id}></ChatArea>
      </div>
    </div>
  );
}
