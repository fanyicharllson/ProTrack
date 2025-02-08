
import React from 'react';

interface MessageProps {
  type: 'success' | 'error';
  message: string;
}

const Message: React.FC<MessageProps> = ({ type, message }) => {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const title = type === 'success' ? 'Success!' : 'Error!';

  return (
    <div className={`${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded relative`} role="alert">
      <strong className="font-bold">{title}</strong>
      <span className="block sm:inline"> {message}</span>
    </div>
  );
};

export default Message;