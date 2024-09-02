import React, {useEffect} from 'react'

export const Dialog: React.FC<{ message: string, onClose: () => void }> = ({ message, onClose }) => {
    useEffect(() => {
  
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
    <div className='fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50 z-50' >
      <dialog open className="bg-white dark:bg-[#262626] p-8 rounded-md">

          <p className=' dark:text-neutral-100 px-2 font-bold '>{message}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 transition-colors"
            onKeyDown={close}
          >
            Close
          </button>
      </dialog>
      </div>
    )
    
  }
