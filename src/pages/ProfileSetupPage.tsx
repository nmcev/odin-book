import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProfileSetupPage: React.FC = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(e.target.files[0]);
        }
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            if (authContext?.credentials && profilePic) {
                const registrationData = {
                    username: authContext?.credentials.username,
                    password: authContext?.credentials.password,
                    name,
                    bio,
                    profilePic,
                };
    
                await authContext.register(
                    registrationData.username,
                    registrationData.password,
                    registrationData.name,
                    registrationData.bio,
                    registrationData.profilePic
                );
    
                if (await authContext.login(authContext.credentials.username, authContext.credentials.password)) {
                    navigate('/');
                }
            } else {
                console.error("Username or password is missing");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    }
    


    if (!authContext?.credentials.username && !authContext?.credentials.password) {
        return (
            <div className='flex justify-center min-h-screen items-center text-4xl font-extrabold'>
                Fill the registration page first (:
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Set Up Your Profile
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900  dark:text-neutral-100 px-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                            Bio
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="bio"
                                name="bio"
                                required
                                onChange={(e) => setBio(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900   dark:text-neutral-100 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="profilePic" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                            Profile Picture
                        </label>
                        <div className="mt-2">
                            <input
                                id="profilePic"
                                name="profilePic"
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                    <button
                         type="submit"
                         disabled={loading}
                         className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 ${loading ? 'opacity-50' : ''} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                     >
                         {loading ? 'Saving...' : 'Save Profile'}
                     </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
