import React, { useEffect, useState } from 'react';

interface MessageProps {
  type: 'success' | 'error';
  message: string;
}

const Message: React.FC<MessageProps> = ({ type, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const title = type === 'success' ? 'Success!' : 'Error!';

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-6 px-4 py-3 rounded ${bgColor} ${borderColor} ${textColor} transition-transform duration-500 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-40'
      } max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-full mx-auto`}
      role="alert"
    >
      <strong className="font-bold text-sm sm:text-base md:text-lg">{title}</strong>
      <span className="block text-sm sm:text-base md:text-lg"> {message}</span>
    </div>
  );
};

export default Message;