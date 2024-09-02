import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Page, PostInterface } from '../types';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import { Comment } from '../components/Comment';
import { FaArrowLeft } from 'react-icons/fa'
import { PostSkeleton } from '../components/PostSkeleton';

const API = import.meta.env.VITE_API
export const PostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [newComment, setNewComment] = useState('');
    const [post, setPost] = useState<PostInterface | null>(null);
    const postContext = useContext(PostContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();

    const currentUser = useContext(AuthContext)?.user
    const fetchPost = async () => {
        const res = await fetch(`${API}/api/posts/${postId}`, {
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


    useEffect(() => {
        const eventSource = new EventSource(`${API}/events`);
    
        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);
          
            if (data.type === 'like' && data.userId !== currentUser?._id) {
                setPost(prevPost => {
                    if (prevPost) {
                        return {
                            ...prevPost,
                            likes: [data.userId, ...(prevPost?.likes || [])]
                        
                        }
                    }
                    return prevPost
                }

                );
            }
            else if (data.type === 'unlike' && data.userId !== currentUser?._id) {
                setPost(prevPost => {
                    if (prevPost) {
                        return {
                            
                            ...prevPost,
                            likes: prevPost?.likes.filter(id => id !== data.userId)
                            
                        }
                    }
                    return prevPost
                })
            }
            else if (data.type === 'comment') {
                setPost(prevPost => {
                    if (prevPost) {
                        return {
                            ...prevPost,
                            comments: [...prevPost?.comments || [], data.comment,]
                        }
                    }
                    return prevPost
                })
            }
        
    
        }

        eventSource.onerror = function(err) {
          console.error('EventSource failed:', err);
      };
    
      return () => {
          eventSource.close();
      };
        
    }, [currentUser?._id])
    
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

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
    };


    const handleCommentSubmit = async () => {

        if (isDisabled) return;

        setIsDisabled(true);
        if (currentUser && newComment.trim()) {
            const res = await fetch(`${API}/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    content: newComment,
                    userId: currentUser._id,
                    postId: post?._id

                })
            });

            if (res.ok) {
                const updatedPost = await fetch(`${API}/api/posts/${postId}`, {
                    credentials: 'include'
                }).then(res => res.json());
    
                setPost(updatedPost);
                setNewComment('');
                setIsDisabled(false)
              
            }
        }
    };
    const reversedComments = post?.comments ? [...post.comments].reverse() : [];
    
    return (
        
        <div className="min-h-screen sm:my-24 my-44 flex items-start justify-center   ">
            <button
                className="flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft className='mr-4' />
            </button>
            {post ? (
                <div className='flex flex-col gap-4 '>
                    <Post post={post} page={Page.PostPage} onLike={handleLike} />

                    {/* comment input */}
                    {currentUser &&
                        <div className='w-full max-w-lg max-sm:mx-8'>
                            <textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="write a comment..."
                                className="w-full p-2 border rounded-md resize-none"
                                rows={3}
                            />
                           <button
                               onClick={!isDisabled ? handleCommentSubmit : undefined}
                               className={`mt-2 max-sm:text-sm px-4 py-2 rounded-md text-white ${
                                   isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                               }`}
                               disabled={isDisabled} 
                           >
                               {isDisabled ? 'Posting...' : 'Post Comment'}
                           </button>
                        </div>
                    }
                    <div className='flex flex-col gap-4 divide-y-[1.5px]'>
                        {reversedComments.map((comment, index) => (
                        <Comment key={comment._id || index} comment={comment} />
                    ))}
                        </div>
                </div>
            ) : (
                    <PostSkeleton />
            )}
        </div>
    );
};
