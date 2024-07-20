import clsx from "clsx";
import { useState } from "react";

export const Tabs = () => {
    const [activeTab, setActiveTab] = useState('Threads');
  
    return (
      <div className="relative">
        <div className="flex border-b-[1px] border-[#999999] p-2">
          <div className="flex justify-around items-center w-full">
            <div
              onClick={() => setActiveTab('Threads')}
              className={clsx('text-[15px] font-semibold cursor-pointer', {
                'text-black': activeTab === 'Threads', 'text-[#999999]': activeTab === 'Reposts'
              })}
            >
              Threads
            </div>

                    
            <div
              onClick={() => setActiveTab('Reposts')}
              className={clsx('text-[15px] font-semibold cursor-pointer', {
                'text-black': activeTab === 'Reposts', 'text-[#999999]': activeTab === 'Threads'
              })}
            >
              Reposts
            </div>
          </div>
            </div>
            
        <div
          className={clsx(
            'absolute bottom-0 h-[1.5px] bg-black transition-all duration-300',
            {
              'left-0 w-1/2': activeTab === 'Threads',
              'left-1/2 w-1/2': activeTab === 'Reposts',
            }
          )}
        ></div>
      </div>
    );
  };
  