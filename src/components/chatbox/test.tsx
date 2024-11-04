import React, { useState, useRef, useEffect } from 'react';

const ChatComponent: React.FC = () => {
  const [arr, setArr] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="mt-40">
      <button
        onClick={() => {
          setArr([...arr, 3]);
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          setArr([4, ...arr.filter((item) => item != 3)]);
        }}
      >
        swap
      </button>
      <div className="flex flex-col items-center">
        {arr.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default ChatComponent;
