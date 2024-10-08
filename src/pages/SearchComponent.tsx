import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const API = import.meta.env.VITE_API

const SearchComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const fetchResults = async (query: string) => {
        if (query.trim()) {
            setLoading(true); 
            try {
                const response = await fetch(`${API}/api/search?username=${query}`);
                if (response.ok) {
                    const data = await response.json();
                    setResults(data);
                } else {
                    console.error('Error fetching results');
                    setResults([]);
                }
            } catch (error) {
                console.error('Error:', error);
                setResults([]);
            } finally {
                setLoading(false); 
            }
        } else {
            setResults([]);
        }
    };

    return (
        <div className="min-h-screen mt-24 max-sm:mt-52 max-sm:mx-6 mx-auto flex flex-col gap-8 max-w-2xl">
            <DebounceInput
                minLength={1}
                debounceTimeout={300}
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    fetchResults(e.target.value);
                }}
                placeholder="Search..."
                className="p-2 border rounded-md"
                aria-label="Search"
            />
            <div className=' flex flex-col space-y-6 divide-y-[.5px] '>
                {loading ? (
                    <p>Loading...</p>
                ) : results.length > 0 ? (
                    results.map((user, index) => (
                        <div key={index} className="p-2 mt-2 flex  gap-4 cursor-pointer" onClick={() => navigate(`/${user.username}`) }>
                            <div className='max-w-20'>
                                <img src={user.profilePic} alt={user.name} className='rounded-full w-14 h-14 object-cover' />
                            </div>

                            <div className='pt-4'>
                                <h1 className=' font-semibold'>{user.username}</h1>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
