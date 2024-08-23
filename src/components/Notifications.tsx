import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from '../contexts/PostContext';
import moment from 'moment';
// import moment from 'moment';

const Notifications: React.FC = () => {

    const notifications = useContext(PostContext)?.notifications

    return (
         <div className="min-h-screen my-24 flex items-center flex-col divide-y-[1.5px] ">
             {notifications?.map((notification) => (
                 <div key={notification._id} className="w-full max-w-md p-4 my-2 bg-white flex items-center space-x-48">
                     <div className='flex gap-2 items-center'>
                     <img
                         src={notification.user.profilePic}
                         alt={`${notification.user.username}'s profile`}
                         className="w-12 h-12 rounded-full object-cover"
                     />
                     <p className="text-gray-800 text-sm">
                         <span className="font-bold">
                             <Link to={`/${notification.user.username}`}>
                                {notification.user.username} &nbsp;
                             </Link>
                         </span>
                         {getNotificationMessage(notification.type)}
                     </p>

                     </div>
                     
                         
                     <div className='flex flex-col max-w-72 w-full gap-2'>
                    {['like', 'repost'].includes(notification.type) && (
                        <Link to={`/${notification.recipient.username}/${notification.post._id}`}>
                            <img
                                className="w-16 h-16 object-cover rounded-md"
                                src={notification.post.media}
                                alt="Notification Media"
                            />
                        </Link>
                    )}

                  
                     <span className='text-xs text-gray-600'>{ moment(notification.createdAt).fromNow()}</span>
                     </div>
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
