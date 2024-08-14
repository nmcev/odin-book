import React, {useEffect} from 'react'

export const Dialog: React.FC<{ message: string, onClose: () => void }> = ({ message, onClose }) => {
    useEffect(() => {
      document.body.style.overflow = 'hidden';
  
      const handleEscapeClose = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscapeClose);
  
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscapeClose);
      };
    }, [onClose]);
  
  
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50'>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>{message}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 transition-colors"
            onKeyDown={close}
          >
            Close
          </button>
        </div>
      </div>
    )
    
  }
