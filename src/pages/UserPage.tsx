import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostInterface, User } from '../types';
import { Tabs } from '../components/Tabs';
import { Post } from '../components/Post';
import { AuthContext } from '../contexts/AuthContext';
import { PostContext } from '../contexts/PostContext';
import { FollowContext } from '../contexts/FollowContext';
export const UserPage: React.FC = () => {
    const { username } = useParams();

    const [user, setUser] = useState<User>();
    const [followers, setFollowers] = useState<User[]>()
    
    const authContext = useContext(AuthContext);
    const followContext = useContext(FollowContext);

    const setFollowing = followContext?.setFollowing;
    const following = followContext?.following;
    const {likePost, removeLike } = useContext(PostContext) || {}
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [reposts, setReposts] = useState<PostInterface[]>([]);
    const navigate = useNavigate();
    const [error, setError ] = useState(false)
    const [activeTab, setActiveTab] = useState('Threads');

    const fetchAUser = async () => {
    
        try {
            const res = await fetch(`http://localhost:3000/api/users/${username}`)
            if (!res.ok) {
                throw new Error('User not found');
    
            }
            const data: User = await res.json();
    
          setFollowers(data.followers)
            setUser(data)
            setPosts(data.posts || []); 
            setReposts(data.repostedPosts || []);

        } catch (error) {
            setError(true)
        }

    }

    const handleFollowersPage = (username: string) => {
        navigate(`/${username}/followers`);
    }

    useEffect(() => {
        fetchAUser()

        if (authContext?.user?.username === username) {
            navigate('/profile');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])

    const handleFollowUnfollow = async () => {
        if (user) {
            const url = `http://localhost:3000/api/${isFollowing() ? 'unfollow' : 'follow'}/${user._id}`;
            const method = isFollowing() ? 'DELETE' : 'POST';

            await fetch(url, {
                credentials: 'include',
                method: method,
            });

            setFollowers((prevFollowers) => {
                if (authContext?.user) {
                    if (isFollowing()) {
                        // removing the follower
                        return prevFollowers?.filter(follower => follower._id !== authContext?.user?._id);
                    } else {
                        // add the follower
                        return prevFollowers ? [...prevFollowers, authContext?.user] : [authContext?.user];
                    }
                }

            
            });

            if ( isFollowing() && setFollowing && following) {
                setFollowing(following.filter(user => user._id !== authContext?.user?._id));
            } else if (setFollowing && following) {
                setFollowing([...following, user]);

            }

            
        }
    };
      const isFollowing = () => {
        return followers?.some(follower => follower._id === authContext?.user?._id);
      }
    
    const handleLike = (post: PostInterface) => {
        const currentUserId = authContext?.user?._id
        
        if (currentUserId && !post?.likes.includes(currentUserId)) {
            if (likePost) {
                likePost(post?._id ?? '', user?._id ?? '');
            }

        setPosts(prevPosts =>
            prevPosts.map(p =>
                p._id === post._id
                    ? { ...p, likes: [...p.likes, currentUserId] }
                    : p
            )
        );

        setReposts(prevPosts =>
            prevPosts.map(p =>
                p._id === post._id
                    ? { ...p, likes: [...p.likes, currentUserId] }
                    : p
            )
        );
            
    
    
        } else if (currentUserId && post?.likes.includes(currentUserId ?? '')) {
            if (removeLike) {
                removeLike(post?._id ?? '', user?._id ?? '');
            }
    


            setPosts(prevPosts =>
                prevPosts.map(p =>
                    p._id === post._id
                        ? { ...p, likes: p.likes.filter(id => id !== currentUserId) }
                        : p
                )
            );


            setReposts(prevPosts =>
                prevPosts.map(p =>
                    p._id === post._id
                        ? { ...p, likes: p.likes.filter(id => id !== currentUserId) }
                        : p
                )
            );
        }
    }



    if (error) {
        return ( 
            <div className='min-h-screen  flex items-center justify-center'>
                <h1 className='font-extrabold font-sans text-xl dark:text-white '>
                  NOT FOUND! 404
                </h1>
            </div>
        )
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
                 <img  src={user?.profilePic || ''} className='object-cover rounded-full h-20 w-20' alt={user?.name} />
             </div>
        </div>
        
            <div className='flex flex-col gap-2 '>
            <p className='text-[15px]'>{user?.bio}</p>
            {user?.username && (
                <div className='flex gap-3'>
                <button onClick={() => handleFollowersPage(user.username)} className="text-[15px] text-[#999999] relative top-8 w-fit group cursor-pointer">
                    <span className="text-[15px]">{followers?.length || 0}</span> followers
                    <span className="block h-[1px] w-full bg-slate-700 absolute top-[17px] left-0 scale-x-0 group-hover:scale-x-100 "></span>
                </button>

                </div>
            )}
            </div>


              
          </div>
          
          {authContext?.user && authContext?.user?.username !== username && (
                <button
                    onClick={handleFollowUnfollow}
                    className={`px-4 py-2 rounded-lg text-white transition-colors ${
                        isFollowing()
                            ? 'bg-gray-400'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {isFollowing() ? 'Unfollow' : 'Follow'}
                </button>
            )}
    {/* down section */}
    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

    <div className=" flex items-center flex-col divide-y-[1.5px] gap-2">

        
        {activeTab === 'Threads' ? (posts?.map((post) => {
            return (
                <Post key={post._id} post={post} onLike={() =>  handleLike(post)} />

            )
        })
        ) : (
            (reposts?.map((post) => (
                <Post key={post._id} post={post} onLike={() =>  handleLike(post)}/>
            ))
            )  
        )
}
    </div>
</div>
  )
}
