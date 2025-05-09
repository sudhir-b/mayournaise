import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  duration = 3000, 
  onClose 
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 200);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Determine color based on type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          textColor: 'text-green-800',
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800',
        };
    }
  };

  const { bgColor, textColor } = getTypeStyles();

  return (
    <div 
      className={`fixed top-4 right-4 z-50 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className={`${bgColor} rounded-md p-3 border border-gray-200 flex items-center max-w-sm`}>
        <div>
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
        <button 
          onClick={() => setVisible(false)} 
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;