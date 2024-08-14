import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const SearchComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const fetchResults = async (query: string) => {
        if (query.trim()) {
            setLoading(true); 
            try {
                const response = await fetch(`http://localhost:3000/api/search?username=${query}`);
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
        <div className="min-h-screen mt-24 mx-auto flex flex-col gap-8 max-w-2xl">
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
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : results.length > 0 ? (
                    results.map((user, index) => (
                        <div key={index} className="border p-2 mt-2 flex  gap-2" onClick={() => navigate(`/${user.username}`) }>
                            <div className='max-w-20'>
                                <img src={user.profilePic} alt={user.name} className='rounded-full' />
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
