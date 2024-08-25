import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { User } from '../types';

export const LoginPage: React.FC = () => {
    const [pw, setPw] = useState('');
    const [username, setUsername] = useState('');
    const authContext = useContext(AuthContext)


    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/demo-users');
                const data = await response.json();
                setUsers(data); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);



 
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await authContext?.login(username, pw)
    };


    if (authContext?.isLoggedIn) {
        return (
            <Navigate to={'/'}/>
        )
    }

    const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUsername = e.target.value;
        setUsername(selectedUsername); 
        if (selectedUsername) {
            logInSelectedUser(selectedUsername);
        }
    };

    const logInSelectedUser = async (user: string) => {
        await authContext?.login(user, '123456');
    };
    
    return (
        
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {!authContext?.isLoggedIn &&
                <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>
            </div>

                
                
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                    <div>
                                <label htmlFor="user-select" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    Select a User to login 
                                </label>
                                <div className="mt-2">
                                    <select
                                         onChange={handleUserSelect}
                                        id="user-select"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Select a user</option>
                                        {users.slice(0, 5).map((user) => (
                                            <option key={user._id} value={user.username} onClick={()=> logInSelectedUser(user.username)}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                autoComplete="username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                onChange={(e) => setPw(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                    {authContext?.loginError && <p className=' text-red-500 text-sm p-2'>{authContext.loginError}</p> }                                        
                    
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Signup
                    </a>
                </p>
            </div>
                </>
}
        </div>
    );
};
