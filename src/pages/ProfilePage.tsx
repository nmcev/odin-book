import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Tabs } from '../components/Tabs';
import { Post } from '../components/Post';
import { useNavigate } from 'react-router-dom';
import { FollowContext } from '../contexts/FollowContext';
import { PostContext } from '../contexts/PostContext';
import { PostInterface } from '../types';

export const ProfilePage:React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user
    const [activeTab, setActiveTab] = useState('Threads');
    const navigate = useNavigate();
    const followContext = useContext(FollowContext);
    const postContext = useContext(PostContext)
    const [reposts, setReposts] = useState<PostInterface[]>([])
    const [posts, setPosts] = useState<PostInterface[]>([])



    useEffect(() => {
        if (user?.posts) setPosts(user?.posts )
    }, [user?.posts])
    
    useEffect(() => {
       if (user?.repostedPosts) setReposts(user?.repostedPosts);

    }, [user?.repostedPosts]);



    const handleFollowersPage = (username: string) => {
        navigate(`/${username}/followers`);
    }

    const handleFollowingPage = () => {
        navigate(`/profile/following`);
    }


    const handleLike = (post: PostInterface) => {

        if (user && !post?.likes.includes(user._id)) {
          postContext?.likePost(post?._id ?? '', user?._id ?? '');
    
          setPosts(prevPosts =>
            prevPosts.map(p =>
                p._id === post._id
                    ? { ...p, likes: [...p.likes, user._id] }
                    : p
            )
        );
        
        // Update local state for reposts
        setReposts(prevReposts =>
            prevReposts.map(p =>
                p._id === post._id
                    ? { ...p, likes: [...p.likes, user._id] }
                    : p
            )
        );
            
            
        } else if (user?._id) {
          postContext?.removeLike(post?._id ?? '', user?._id ?? '');
          
          setPosts(prevPosts =>
            prevPosts.map(p =>
                p._id === post._id
                    ? { ...p, likes: p.likes.filter(id => id !== user._id) }
                    : p
            )
        );
        
        // Update local state for reposts
        setReposts(prevReposts =>
            prevReposts.map(p =>
                p._id === post._id
                    ? { ...p, likes: p.likes.filter(id => id !== user._id) }
                    : p
            )
        );
            
        }
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

                
                {activeTab === 'Threads' ? (posts.map((post) => {
                    return (
                        <Post key={post._id} post={post} onLike={() => handleLike(post)} />

                    )
                })
                ) : (
                    (reposts.map((post) => (
                        <Post key={post._id} post={post} onLike={() =>  handleLike(post)} />
                    ))
                    )  
                )
        }
            </div>
        </div>
  )
}



