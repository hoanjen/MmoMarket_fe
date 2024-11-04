import { useLocation, useSearchParams } from 'react-router-dom';
import MessageItem from './MessageItem';
import { ChatBoxApi } from '../../api/chatbox/chatbox';
import { useEffect, useRef, useState } from 'react';
import { DetailGroup, Message, MessageSideBar } from '../../api/chatbox/types';
import { Skeleton } from '@mui/material';
import { toast } from 'react-toastify';
import { UploadApi } from '@api/upload/upload';
import { ResponseFileImage } from '@api/profile/types';

interface ChatAreaProps {
  user_id: string | undefined;
  chat_to: string | null;
  setSideBar: (item: MessageSideBar) => void;
  newMessage: Message | null;
}

interface IURL {
  url: string;
  name: string;
  size: number;
}

export default function ChatArea({ user_id, chat_to, setSideBar, newMessage }: ChatAreaProps) {
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [partner, setPartner] = useState<DetailGroup[]>([]);
  const [messageData, setMessageData] = useState<Message[]>([]);
  const [bounce, setBounce] = useState(true);
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | string>('');
  const [url, setUrl] = useState<IURL>();
  const [upload, setUpload] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [heightScorllDefauft, setHeightScorllDefauft] = useState(1);

  const popupUploadFile = () => {
    return (
      <div className="flex items-center justify-center z-50 absolute top-[-280px]">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Chọn ảnh tải lên</h2>
            <button
              onClick={() => {
                setUpload(!upload);
              }}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <label className="block text-gray-700 font-medium mb-2">Chọn ảnh:</label>
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setFile(file);
                }
              }}
              type="file"
              className="block w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            />
          </div>
          <div
            onClick={() => {
              upLoadFile();
            }}
            className="p-4 border-t"
          >
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none">
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  };
  const previewFile = () => {
    return (
      <div className="absolute top-[-116px] left-32 z-50">
        <div
          onClick={() => {
            setFile('');
          }}
          className="cursor-pointer hover:bg-slate-400 p-1 inline-flex hover:rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </div>
        <img className="max-h-24" src={url?.url} alt="" />
      </div>
    );
  };
  useEffect(() => {
    getMessageByGroupId('first');
    return () => {
      setPartner([]);
    };
  }, [chat_to]);

  const getMessageByGroupId = async (cursor: string) => {
    setIsLoading(true);
    if (chat_to) {
      const data = await ChatBoxApi.getMessageByGroupId(15, cursor, chat_to);
      if (data && data.statusCode === 400) {
        toast.error(data.message);
      }
      setHeightScorllDefauft(2);
      setMessageData(data.data.messages);

      setPartner(data.data.detailGroup);
    }
    setIsLoading(false);
  };

  const getMessageByGroupIdMore = async (cursor: string) => {
    if (chat_to && chatAreaRef.current) {
      // Ghi lại chiều cao trước khi thêm tin nhắn mới
      const previousScrollHeight = chatAreaRef.current.scrollHeight;
      const previousScrollTop = chatAreaRef.current.scrollTop;

      const data = await ChatBoxApi.getMessageByGroupId(15, cursor, chat_to);
      if (data && data.statusCode === 400) {
        toast.error(data.message);
      }
      if (data.data.messages.length > 0) {
        setMessageData((prevMessages) => [...prevMessages, ...data.data.messages]);

        // Sử dụng requestAnimationFrame để đảm bảo cập nhật vị trí cuộn sau khi DOM đã render
        requestAnimationFrame(() => {
          if (chatAreaRef.current) {
            const newScrollHeight = chatAreaRef.current.scrollHeight;
            chatAreaRef.current.scrollTop = newScrollHeight - previousScrollHeight + previousScrollTop;
          }
        });
      }
    }
  };

  const handleScroll = async () => {
    if (bounce && chatAreaRef.current) {
      const { scrollTop } = chatAreaRef.current;

      if (bounce && scrollTop < 50) {
        setBounce(false);
        await getMessageByGroupIdMore(messageData[messageData.length - 1]?.created_at);
        setBounce(true);
      }
    }
  };
  useEffect(() => {
    const sidebarElement = chatAreaRef.current;

    if (sidebarElement) {
      sidebarElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener('scroll', handleScroll);
      }
    };
  });
  useEffect(() => {
    const sidebarElement = chatAreaRef.current;

    if (sidebarElement) {
      sidebarElement.scrollTop = sidebarElement.scrollHeight;
    }
  }, [heightScorllDefauft]);

  useEffect(() => {
    const sidebarElement = chatAreaRef.current;

    if (sidebarElement) {
      sidebarElement.scrollTop = sidebarElement.scrollHeight;
    }
  }, [isLoading]);
  const upLoadFile = async () => {
    try {
      const res = await UploadApi.uploadImage(file);
      setFile('');
      setUrl(res[0]);
    } catch (error: any) {
      toast.error(error);
    }
  };
  const sendMessage = async () => {
    const urlImage = url?.url ? url.url : '';
    const file_name = url?.url ? url.name : '';
    if (urlImage || text) {
      const message: Message = {
        text,
        file: urlImage,
        file_name,
        group_id: chat_to,
        id: null,
        member_id: null,
        user: null,
        user_id: user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const data = await ChatBoxApi.sendMessage({ text, file: urlImage, file_name, group_id: chat_to });
      setMessageData([message, ...messageData]);
      setSideBar({
        avatar: partner[0].user_avatar,
        username: partner[0].user_username,
        group_id: partner[0].group_id,
        group_name: partner[0].group_group_name
          ? partner[0].group_group_name
          : partner[0].user_first_name + ' ' + partner[0].user_last_name,
        user_id,
        first_name: partner[0].user_first_name,
        last_name: partner[0].user_last_name,
        id: null,
        created_at: new Date().toISOString(),
        file_name,
        text,
        group_type: partner[0].group_group_type,
      });
      setText('');
      setUpload(false);
      setUrl(undefined);
      if (data && data.statusCode === 400) {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    if (newMessage) {
      setMessageData([newMessage, ...messageData]);
    }
  }, [newMessage]);
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-200 p-3 border-b border-gray-300 flex items-center justify-between">
        {!isLoading ? (
          <div className="flex items-center space-x-4 mb-1">
            <img
              src={partner[0]?.group_group_type === 'SINGLE' ? partner[0]?.user_avatar : partner[0]?.group_group_avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">
                {partner[0]?.group_group_type === 'SINGLE' ? partner[0]?.user_first_name : partner[0]?.group_group_name}
                <span className="pl-2 text-sm text-green-500">Online</span>
              </p>
              <p className="font-bold text-green-600">
                @{partner[0]?.group_group_type === 'SINGLE' ? partner[0]?.user_username : partner[0]?.group_id}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4 mb-1">
            <Skeleton animation="wave" variant="rectangular" width={48} height={48} className="rounded-full" />
            <div>
              <Skeleton animation="wave" variant="rectangular" width={120} height={16} className="rounded-full" />
              <Skeleton animation="wave" variant="rectangular" width={80} height={16} className="mt-2 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div
        ref={chatAreaRef}
        className={`flex-col space-y-2 bg-gray-50 p-4 rounded min-h-[700px] max-h-[700px] overflow-y-auto`}
      >
        {messageData
          .slice()
          .reverse()
          .map((value, key) => (
            <MessageItem key={key} message={value} user_id={user_id}></MessageItem>
          ))}
      </div>

      {/* Input */}
      <div className="flex items-center space-x-2 border-t pt-2 relative">
        <div>{upload ? (!url ? popupUploadFile() : previewFile()) : ''}</div>
        <div className="flex">
          <div
            onClick={() => {
              setUpload(!upload);
            }}
            className="ml-4 cursor-pointer hover:bg-slate-300 hover:rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-link-45deg "
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
            </svg>
          </div>

          <div className="mx-2 cursor-pointer hover:bg-slate-300 hover:rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-emoji-smile"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
            </svg>
          </div>
        </div>

        <textarea
          ref={inputRef}
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          className={`border p-2 transition-all duration-300 ease-in-out w-2/3 border-gray-300 resize-none overflow-auto`}
          placeholder="Nhập tin nhắn của bạn..."
        />
        <button onClick={sendMessage} className="p-2 pt-3 pr-3 bg-blue-500 text-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
