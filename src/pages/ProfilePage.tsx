import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Tabs } from '../components/Tabs';
import { Post } from '../components/Post';
import { useNavigate } from 'react-router-dom';
import { FollowContext } from '../contexts/FollowContext';

export const ProfilePage:React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user
    const [activeTab, setActiveTab] = useState('Threads');
    const navigate = useNavigate();
    const followContext = useContext(FollowContext);


    const handleFollowersPage = (username: string) => {
        navigate(`/${username}/followers`);
    }

    const handleFollowingPage = () => {
        navigate(`/profile/following`);
    }

    return (
        <div className="min-h-screen mt-24  mx-auto flex  flex-col  gap-8 max-w-2xl">
            
            {/* above section */}
            <div className='flex flex-col gap-1 justify-center'>

                {/* info section */}
                <div className='flex bg-white flex-1 gap-5 justify-between'>

                    <div className='flex-1'>
                        <h2 className='text-2xl font-bold'>{user?.name || 'name'}</h2>
                        <span className='text-[15px]'>{ user?.username ||"username"}</span>
                    </div>


                     {/* image section */}
                     <div className='rounded-full'>
                         <img  src={user?.profilePic || ''} className='object-fill rounded-full max-w-[84px]' alt={user?.name} />
                     </div>
                </div>
                
                    <div className='flex flex-col gap-2 '>
                    <p className='text-[15px]'>{user?.bio}</p>
                    {user?.username && (
                        <div className='flex gap-3'>
                        <button onClick={() => handleFollowersPage(user.username)} className="text-[15px] text-[#999999] relative top-8 w-fit group cursor-pointer">
                            <span className="text-[15px]">{followContext?.followers && followContext.followers.length}</span> followers
                            <span className="block h-[1px] w-full bg-slate-700 absolute top-[17px] left-0 scale-x-0 group-hover:scale-x-100 "></span>
                        </button>


                            { user &&
                                <button onClick={handleFollowingPage} className="text-[15px] text-[#999999] relative top-8 w-fit group cursor-pointer">
                                    <span className="text-[15px]">{followContext?.following && followContext.following.length}</span> following
                                    <span className="block h-[1px] w-full bg-slate-700 absolute top-[17px] left-0 scale-x-0 group-hover:scale-x-100 "></span>
                                </button>
                            }
                        </div>
                    )}
                    </div>


            </div>

            {/* down section */}
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className=" flex items-center flex-col divide-y-[1.5px] gap-2">

                
                {activeTab === 'Threads' ? (user?.posts?.map((post) => {
                    return (
                        <Post key={post._id} post={post} />

                    )
                })
                ) : (
                    (user?.repostedPosts?.map((post) => (
                        <Post key={post._id} post={post} />
                    ))
                    )  
                )
        }
            </div>
        </div>
  )
}



