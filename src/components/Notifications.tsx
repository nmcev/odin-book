import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from '../contexts/PostContext';
import moment from 'moment';
// import moment from 'moment';

const Notifications: React.FC = () => {

    const notifications = useContext(PostContext)?.notifications

    if (notifications?.length === 0) {
        return <>
                <div className="min-h-screen flex items-center justify-center flex-col divide-y-[1.5px] ">
                    <p className='text-lg text-gray-700 '>No Notifications</p>
                </div>
        </>
    }
    return (
         <div className="min-h-screen my-24 flex items-center flex-col divide-y-[1.5px] ">
             {notifications?.map((notification) => (
                 <div key={notification._id} className="w-full max-w-2xl p-4 my-2  flex items-start justify-between">
                     <div className='flex gap-4 items-center'>
                     <img
                         src={notification.user.profilePic}
                         alt={`${notification.user.username}'s profile`}
                         className="w-12 h-12 rounded-full object-cover"
                     />
                     <div className="text-gray-800 dark:text-neutral-100  text-sm  w-full max-w-2xl flex-1">
                         <span className="font-bold">
                             <Link to={`/${notification.user.username}`}>
                                {notification.user.username} &nbsp;
                             </Link>
                         </span>
                         {getNotificationMessage(notification.type)} &nbsp; <span className='text-xs inline-block  text-gray-600 dark:text-neutral-400'>{ moment(notification.createdAt).fromNow()}</span>

                     </div>

                     </div>
                     
                         
                    
                    {['like', 'repost'].includes(notification.type) &&  notification.post.media && (
                        <Link to={`/${notification.recipient.username}/${notification.post._id}`}>
                            <img
                                className="w-16 h-16 object-cover rounded-md"
                                src={notification.post.media}
                                alt="Notification Media"
                            />
                        </Link>
                    )}

                  
                 </div>
             ))}
         </div>
    );
};

const getNotificationMessage = (type: string) => {
    switch (type) {
        case 'like':
            return 'liked your post';
        case 'repost':
            return 'reposted your post';
        case 'follow':
            return 'started following you';
        default:
            return 'i dunno what the user did';
    }
};

export default Notifications;
