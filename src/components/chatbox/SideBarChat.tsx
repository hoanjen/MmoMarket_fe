import { useEffect, useRef, useState } from 'react';
import SideBarChatItem from './SideBarChatItem';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ChatBoxApi } from '../../api/chatbox/chatbox';
import { Skeleton, Stack } from '@mui/material';
import { GroupSideBar, MessageSideBar } from '@api/chatbox/types';
import { useNavigate } from 'react-router-dom';

type SideBar = {
  groupSideBar: GroupSideBar;
  messageSideBar: MessageSideBar;
};

export default function SideBarChat({
  chat_to,
  sideBarChatItem,
  user_id,
}: {
  chat_to: string | null;
  sideBarChatItem: MessageSideBar | null;
  user_id: string;
}) {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [groupSideBar, setGroupSideBarData] = useState<GroupSideBar[]>([]);
  const [messageSideBar, setMessageSideBar] = useState<MessageSideBar[]>([]);
  const [bounce, setBounce] = useState(true);
  const getSideBarByToken = async (cursor: string) => {
    const data = await ChatBoxApi.getSideBarByToken(10, cursor);

    if (data && data.statusCode === 400) {
      toast.error(data.message);
    }
    setMessageSideBar([...messageSideBar, ...data.data.messageSideBar]);
    setGroupSideBarData([...groupSideBar, ...data.data.groupSideBar]);
    setIsLoading(false);
    console.log(data.data.groupSideBar);
    if (!chat_to) {
      navigate(`?chat_to=${data.data.groupSideBar[0].group_id}`);
    }
  };

  const handleScroll = async () => {
    if (bounce && sidebarRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setBounce(false);

        await getSideBarByToken(messageSideBar[messageSideBar.length - 1].created_at);

        setBounce(true);
      }
    }
  };
  useEffect(() => {
    getSideBarByToken('first');
  }, []);

  useEffect(() => {
    const newGroupPosition: GroupSideBar = {
      avatar: sideBarChatItem?.avatar ? sideBarChatItem?.avatar : 'url',
      group_id: sideBarChatItem?.group_id ? sideBarChatItem?.group_id : 'id',
      group_name: sideBarChatItem?.group_name ? sideBarChatItem?.group_name : '',
      group_type: sideBarChatItem?.group_type ? sideBarChatItem?.group_type : 'type',
    };
    const newMessage: MessageSideBar = sideBarChatItem ? sideBarChatItem : messageSideBar[0];
    setGroupSideBarData([
      newGroupPosition,
      ...groupSideBar.filter((item) => item.group_id !== newGroupPosition.group_id),
    ]);
    setMessageSideBar([newMessage, ...messageSideBar.filter((item) => item.group_id !== newGroupPosition.group_id)]);
  }, [sideBarChatItem]);

  useEffect(() => {
    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener('scroll', handleScroll);
      }
    };
  });
  return (
    <div>
      <div
        onClick={() => {
          console.log(groupSideBar);
        }}
        className="bg-gray-50 items-center p-6 font-semibold text-gray-600 text-xl border border-gray-300 rounded-tl-md"
      >
        Gần đây
      </div>
      <div className="h-[760px] overflow-y-auto border border-gray-300" ref={sidebarRef}>
        {!isLoading
          ? groupSideBar.map((item, index) => (
              <SideBarChatItem
                user_id={user_id}
                key={index}
                sideBarChatItem={messageSideBar[index]}
                groupSideBar={item}
                chat_to={chat_to}
              />
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div key={index} className={`flex items-center justify-between p-4 border-b border-gray-300 `}>
                <div className="flex items-center space-x-4">
                  <div>
                    <Skeleton animation="wave" variant="rectangular" width={48} height={48} className="rounded-full" />
                  </div>
                  <div>
                    <Skeleton animation="wave" variant="rectangular" width={80} height={16} className="mb-2" />
                    <Skeleton animation="wave" variant="rectangular" width={200} height={16} />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  <Skeleton animation="wave" variant="rectangular" width={70} height={14} />
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
