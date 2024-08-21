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
    const [posts, setPosts] = useState<PostInterface[]>([])
    const [pfp, setPfp] = useState('');
    const { reposts, setReposts, likePost, removeLike } = useContext(PostContext) || {};


    useEffect(() => {
        if (user?.posts) setPosts(user?.posts )
    }, [user?.posts])
    
    useEffect(() => {
       user?.profilePic && setPfp(user?.profilePic)

    }, [user?.profilePic])



    const handleFollowersPage = (username: string) => {
        navigate(`/${username}/followers`);
    }

    const handleFollowingPage = () => {
        navigate(`/profile/following`);
    }


    const handleLike = (post: PostInterface) => {
        if (user && !post?.likes.includes(user._id)) {
            if (likePost) {
                likePost(post?._id ?? '', user?._id ?? '');
            }
    
            if (setPosts) {
                setPosts((prevPosts: PostInterface[]) =>
                    prevPosts.map(p =>
                        p._id === post._id
                            ? { ...p, likes: [...p.likes, user._id] }
                            : p
                    )
                );
            }
    
            // Update local state for reposts, if needed
            if (setReposts) {
                setReposts((prevReposts: PostInterface[]) =>
                    prevReposts.map(p =>
                        p._id === post._id
                            ? { ...p, likes: [...p.likes, user._id] }
                            : p
                    )
                );
            }
    
        } else if (user?._id) {
            if (removeLike) {
                removeLike(post?._id ?? '', user?._id ?? '');
            }
    
            if (setPosts) {
                setPosts((prevPosts: PostInterface[]) =>
                    prevPosts.map(p =>
                        p._id === post._id
                            ? { ...p, likes: p.likes.filter(id => id !== user._id) }
                            : p
                    )
                );
            }
    
            // Update local state for reposts, if needed
            if (setReposts) {
                setReposts((prevReposts: PostInterface[]) =>
                    prevReposts.map(p =>
                        p._id === post._id
                            ? { ...p, likes: p.likes.filter(id => id !== user._id) }
                            : p
                    )
                );
            }
        }
    }


    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {

            const formData = new FormData();

            formData.append('file', file);
            formData.append('upload_preset',import.meta.env.VITE_UPLOAD_PRESETS );


                    const cloudinaryFetch = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PRESESTS_NAME}/image/upload`, {
                        method: 'POST',
                        body: formData,
                    });      
                    
                    const result = await cloudinaryFetch.json();

                    setPfp(result.secure_url)

                    
                    await fetch('http://localhost:3000/api/edit-profile', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({profilePic: result.secure_url})
                    })


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
                        <div className='relative'>
                        <img  src={pfp} className="rounded-full w-20 h-20 object-cover"  alt={user?.name} />
                            <div className='w-6 h-6 absolute right-0 bottom-0 bg-blue-400 flex justify-center items-center rounded-full'>
                            <input 
                                type='file' 
                                accept='image/*' 
                                className='absolute right-0 bottom-0 opacity-0 cursor-pointer' 
                                id='file-input'
                                onChange={handleImageChange}
                                />
                                
                            <label htmlFor='file-input' className='w-6 h-6 absolute right-0 bottom-0 bg-blue-400 flex justify-center items-center rounded-full cursor-pointer'>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"></path> </g></svg>
                            </label>

                            </div>
                        </div>
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
                    (reposts?.map((post) => (
                        <Post key={post._id} post={post} onLike={() =>  handleLike(post)} />
                    ))
                    )  
                )
        }
            </div>
        </div>
  )
}



