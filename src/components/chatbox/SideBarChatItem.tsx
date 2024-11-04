import { GroupSideBar, MessageSideBar } from '@api/chatbox/types';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ChatItemProps {
  groupSideBar: GroupSideBar;
  sideBarChatItem: MessageSideBar;
  chat_to: string | null;
  user_id: string;
}

export default function SideBarChatItem({ sideBarChatItem, groupSideBar, chat_to, user_id }: ChatItemProps) {
  const navigate = useNavigate();

  const SelectSideBar = (group_id: string | null) => {
    if (chat_to !== group_id) navigate(`/chat-box?chat_to=${group_id}`);
  };
  return (
    <div
      className={`flex items-center justify-between p-4 border-b border-gray-300 ${chat_to === sideBarChatItem.group_id ? 'bg-gray-200' : 'bg-gray-50 cursor-pointer'}`}
      onClick={() => {
        SelectSideBar(sideBarChatItem.group_id);
      }}
    >
      <div className="flex items-center space-x-4">
        <img src={groupSideBar.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold text-gray-800 truncate max-w-52  ">{groupSideBar.group_name}</p>
          <p className="text-gray-500 truncate max-w-56">
            {user_id === sideBarChatItem.user_id
              ? !sideBarChatItem.text
                ? `Bạn đã gửi một file`
                : `Bạn: ${sideBarChatItem.text}`
              : !sideBarChatItem.text
                ? `${sideBarChatItem.first_name} đã gửi một file`
                : `${sideBarChatItem.first_name}: ${sideBarChatItem.text}`}
          </p>
        </div>
      </div>
      <p className="text-gray-500 text-sm">
        {new Date(sideBarChatItem.created_at).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}
