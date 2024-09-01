import {  useState, useEffect } from 'react'
import { UsersList } from '../components/UsersList';
import { useParams } from 'react-router-dom';
import { User } from '../types';

const API = import.meta.env.VITE_API
export const FollowingPage = () => {
    const { username } = useParams();
    const [user, setUser] = useState<User>()
  
    const fetchAUser =  async() => {
    
        const res = await fetch(`${API}/api/users/${username}`)
        const data = await res.json();

      setUser(data)
    }



    useEffect(() => {
        fetchAUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])


    return (
        <div className="min-h-screen mt-24 max-sm:mt-48 flex flex-col items-center divide-y divide-gray-300 gap-4 px-4">
            {  user &&  <UsersList followers={user.following} />}
        </div>
  )
}
