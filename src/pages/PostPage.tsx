import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Page, PostInterface } from '../types';
import moment from 'moment';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import { Comment } from '../components/Comment';

export const PostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<PostInterface | null>(null);
    const postContext = useContext(PostContext);

    const currentUser = useContext(AuthContext)?.user
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

    const handleLike = () => {

        if (currentUser && !post?.likes.includes(currentUser._id)) {
            postContext?.likePost(post?._id ?? '', currentUser?._id ?? '');
        setPost(prevPost => {
            if (prevPost) {
                const updatedLikes = [...new Set([...prevPost.likes, currentUser._id])];
                return {
                    ...prevPost,
                    likes: updatedLikes
                };
            }
            return prevPost;
        });
        } else if (currentUser) {
            postContext?.removeLike(post?._id ?? '', currentUser?._id ?? '');
            setPost(prevPost => {
                if (prevPost) {
                    const updatedLikes = prevPost.likes.filter(id => id !== currentUser._id);
        
                    return {
                        ...prevPost,
                        likes: updatedLikes
                    };
                }
                return prevPost;
            });
    }
    }
    return (
        
        <div className="min-h-screen my-24 flex items-center flex-col divide-y-[1.5px] ">
            {post ? (
                <div className='flex flex-col gap-4 '>
                    <Post post={post} page={Page.PostPage} onLike={handleLike} />
                    <div className='flex flex-col gap-4 divide-y-[1.5px]'>
                        {post.comments.map((comment) => (
                        <Comment comment={comment} />
                    ))}
                        </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};
