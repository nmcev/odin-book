import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { UsersList } from '../components/UsersList';
import { FollowContext } from '../contexts/FollowContext';

export const FollowingPage = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const followContext = useContext(FollowContext)



    console.log(user?.following)
    return (
        <div className="min-h-screen mt-24 flex flex-col items-center divide-y divide-gray-300 gap-4 px-4">
            { followContext && user &&  <UsersList followers={followContext?.following} />}
        </div>
  )
}
