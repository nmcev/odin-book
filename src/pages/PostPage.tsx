import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { PostInterface } from '../types';
import moment from 'moment';

export const PostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<PostInterface | null>(null);

    const fetchPost = async () => {
        const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
            credentials: 'include'
        });

        if (res.ok) {
            const data = await res.json();
            setPost(data);
        }
    };

    useEffect(() => {
        if (postId) {
            fetchPost();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    return (
        
        <div className="min-h-screen my-24 flex items-center flex-col divide-y-[1.5px] ">
            {post ? (
                <div className='flex flex-col gap-4 '>
                    <Post post={post} />
                    <div className='flex flex-col gap-4 divide-y-[1.5px]'>
                    {post.comments.map((comment) => (
                        <div key={comment._id} className="p-4 items-center max-w-lg flex gap-4">
                            <img src={comment.author.profilePic} alt="Profile" className="rounded-full w-10 h-10 object-cover" />
                            <div className="flex-1">
                                <div>
                                    <h2 className="text-[15px] font-bold">{comment.author.username}</h2>
                                    <span className="text-xs text-gray-500 block">
                                        {moment(comment.createdAt).format('MMMM Do YYYY')}
                                    </span>
                                </div>
                                <p className="mt-1 text-gray-700">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                        </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};
