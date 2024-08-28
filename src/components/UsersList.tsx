import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { FollowContext } from '../contexts/FollowContext';
import { User } from '../types';
import { Link } from 'react-router-dom';

interface UsersListProps {
  followers: User[] | undefined;
}
export const UsersList: React.FC<UsersListProps> = ({ followers }) => {
    
    const followContext = useContext(FollowContext);
    
  const setFollowing = followContext?.setFollowing;
  const following = followContext?.following
    const authContext = useContext(AuthContext);
    const currentUser = authContext?.user

    async function unfollow(userId: string) {
        const res = await fetch(`http://localhost:3000/api/unfollow/${userId}`, {
          credentials: 'include',
          method: "DELETE",
        })
        
        if (res.ok && setFollowing && following) {
          setFollowing(following.filter(user => user._id !== userId));
        }
      }
    
    
      const follow = async (userId: string) => {
        const res = await fetch(`http://localhost:3000/api/follow/${userId}`, {
            credentials: 'include',
            method: 'POST',
        });
  
        if (res.ok && setFollowing) {
          const followedUser = followers?.find(user => user._id === userId);
    if (followedUser && following) {
      setFollowing([...following, followedUser]);
    }
          
        }
      };
      const isFollowing = (followerId: string) => {
        return following && following.some(followedUser => followedUser._id === followerId);
      }
    return (
        <>
      {followers?.map((follower) => (
        <div key={follower._id} className="flex items-center justify-between w-full max-w-xl p-4 ">
          <Link to={`/${follower.username}`} className="flex items-center gap-4 flex-1">
            <img
              src={follower.profilePic}
              alt={follower.username}
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-100">{follower.username}</h2>
          </Link>
    
            { currentUser &&currentUser?._id !== follower._id && (
                    <button

                 onClick={() => {
                if (isFollowing(follower._id) ) {
                      unfollow(follower._id)
                } else {
                  follow(follower._id)
                    }
                  }}
                        className={`px-4 py-2 rounded-lg text-white transition-colors ${
                          isFollowing(follower._id)  ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                            {isFollowing(follower._id) ? 'Unfollow' : 'Follow'}
                            </button>
                      
                )
          }    

        </div>
      ))}
            
        {
          followers?.length === 0 && (
            <h1>No users</h1>
          )
        }
      </>
  )
}
