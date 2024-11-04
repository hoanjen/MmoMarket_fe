import { Message } from '../../api/chatbox/types';
type MessageProps = {
  message: Message;
  user_id: string | undefined;
};
export default function MessageItem({ message, user_id }: MessageProps) {
  return user_id === message.user_id ? (
    <div className={`flex space-x-4 items-start justify-end break-words`}>
      <div className="bg-sky-500 p-3 w-80 rounded shadow-md">
        <p className="">{message.text}</p>
        <img className="max-w-[296px] rounded-sm" src={message.file} alt="" />
        <p className="text-xs ">
          {new Date(message.created_at).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  ) : (
    <div className={`flex space-x-4 items-start break-words`}>
      <img src={message.user ? message.user.avatar : ''} alt="Avatar" className="w-8 h-8 rounded-full" />
      <div className="bg-white p-3 w-80 rounded shadow-md">
        <p>{message.text}</p>
        <img className="max-w-[296px] rounded-sm" src={message.file} alt="" />
        <p className="text-xs text-gray-500">
          {new Date(message.created_at).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
