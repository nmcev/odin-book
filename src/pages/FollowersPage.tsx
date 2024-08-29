import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../types';
import { UsersList } from '../components/UsersList';
import { FollowContext } from '../contexts/FollowContext';


export const FollowersPage:  React.FC  = () => {
    const { username } = useParams();
    const [user, setUser] = useState<User>()
    const followContext = useContext(FollowContext);
  const followers = followContext?.followers;
  
    const fetchAUser =  async() => {
    
        const res = await fetch(`http://localhost:3000/api/users/${username}`)
        const data = await res.json();

      setUser(data)
    }



    useEffect(() => {
        fetchAUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])

    
    return (
      <div className="min-h-screen mt-24 max-sm:mt-48 flex flex-col items-center divide-y divide-gray-300 gap-4 px-4">
        { followers && user && <UsersList followers={user.followers}  />}
    </div>

  )
}
