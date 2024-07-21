import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../types';
import { AuthContext } from '../contexts/AuthContext';


export const FollowersPage:  React.FC  = () => {
    const { username } = useParams();
    const [user, setUser] = useState<User>()
    const authContext = useContext(AuthContext);
    const currentUserId = authContext?.user
    const [following, setFollowing] = useState<string[]>([]);

    const fetchAUser =  async() => {
    
        const res = await fetch(`http://localhost:3000/api/users/${username}`)
        const data = await res.json();

        setUser(data)
        setFollowing(currentUserId?.following || []);

    }


    async function unfollow(userId: string) {
      const res = await fetch(`http://localhost:3000/api/unfollow/${userId}`, {
        credentials: 'include',
        method: "DELETE",
      })
      
      if (res.ok) {
        setFollowing(following.filter(id => id !== userId));
    }
    }
  
  
    const follow = async (userId: string) => {
      const res = await fetch(`http://localhost:3000/api/follow/${userId}`, {
          credentials: 'include',
          method: 'POST',
      });

      if (res.ok) {
          setFollowing([...following, userId]);
      }
    };
  

    useEffect(() => {
        fetchAUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])

    
    return (
    <div className="min-h-screen mt-24 flex flex-col items-center divide-y divide-gray-300 gap-4 px-4">
      {user?.followers?.map(follower => (
        <div key={follower._id} className="flex items-center justify-between w-full max-w-xl p-4 ">
          <div className="flex items-center gap-4 flex-1">
            <img
              src={follower.profilePic}
              alt={follower.username}
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
            <h2 className="text-lg font-semibold text-gray-800">{follower.username}</h2>
          </div>
    
              { currentUserId?._id === user._id && (
                    <button

                 onClick={() => {
                if (following?.includes(follower._id)) {
                      unfollow(follower._id)
                } else {
                  follow(follower._id)
                    }
                  }}
                        className={`px-4 py-2 rounded-lg text-white transition-colors ${
                          following?.includes(follower._id) ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                      {following?.includes(follower._id) ? 'Unfollow' : 'Follow'}
                    </button>
                      
                )
          }    

        </div>
      ))}
    </div>

  )
}
