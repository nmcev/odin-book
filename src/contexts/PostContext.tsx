import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { PostInterface, PostContextProps, NotificationType } from "../types";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext<PostContextProps | null>(null)

interface PostProviderProps {
    children: ReactNode;
}

const API = import.meta.env.VITE_API


export const PostProvider: React.FC<PostProviderProps> = ({ children  }) => { 


  const currentUser = useContext(AuthContext)?.user;
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [reposts, setReposts] = useState<PostInterface[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(true);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);



  useEffect(() => {
    const eventSource = new EventSource(`${API}/events`);

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      
      if (data.type === 'new_post') {
        if (data.post?.author._id !== currentUser?._id) {
          setPosts(prevPosts => [data.post, ...prevPosts])

        }
      } else if (data.type === 'like' && data.userId !== currentUser?._id) {
       setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === data.postId
                    ? { ...post, likes: [...post.likes, data.userId] }
                    : post
            )
        );
      }
      else if (data.type === 'unlike' && data.userId !== currentUser?._id) {
       setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === data.postId
                    ? { ...post, likes: post.likes.filter(id => id !== data.userId) }
                    : post
            )
        );
      } else if (data.type === 'comment') {
        setPosts(prevPosts => 
          prevPosts.map(post => post._id === data.postId ? {
            ...post,
            comments: [data.comment, ...post.comments]

          } : post
        )
        )

    }
};
    eventSource.onerror = function(err) {
      console.error('EventSource failed:', err);
  };

  return () => {
      eventSource.close();
  };
    
  } , [currentUser?._id])
  
  const fetchPosts = async (page: number, isLoggedIn: boolean) => {
    setLoading(true);
    setError(null);
      try {
        const endpoint = isLoggedIn ? `${API}/api/posts/user?page=${page}&limit=10` : `${API}/api/posts?page=${page}&limit=10`;

          const response = await fetch(endpoint, {
          credentials: 'include'
      });
      const data = await response.json();


      if (data.posts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => {
          const postsSet = new Set(prevPosts.map((post) => post._id));
          const newPosts = data.posts.filter((newPost: PostInterface) => !postsSet.has(newPost._id));
          return [...prevPosts, ...newPosts];
        });
        
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId: string, userId: string) => {
    
    try {

      const res = await fetch(`${API}/api/posts/like/${postId}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, likes: [...post.likes, userId] } : post
          )
        );
  
      }
    } catch (e) {
      console.log(e)
    }

  }
    const removeLike = async (postId: string, userId: string) => {
    
      try {
  
        const res = await fetch(`${API}/api/posts/unlike/${postId}`, {
          method: 'POST',
          credentials: 'include',
        });
  
        if (res.ok) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === postId ? { ...post, likes: post.likes.filter(id => id !== userId) } : post
            )
          );
        
    
        }
      } catch (e) {
        console.log(e)
      }
    }
  
  
  useEffect(() => {
    
     setReposts(currentUser?.repostedPosts || []);

  }, [currentUser?.repostedPosts])

    const repost = async (postId: string) => {
    
    const res = await fetch(`${API}/api/reposts`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId }),
      credentials: 'include'
    })

    if (res.ok) {
      const repostedPost = await res.json();

      setReposts((prevPosts) => {
        const postExists = prevPosts?.some(post => post._id === repostedPost._id);
    
        return postExists ? prevPosts : [repostedPost, ...prevPosts]
    });
    }
  } 


  const unrepost = async(postId: string) => {

      
    const res = await fetch(`${API}/api/unrepost/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    if (res.ok) {

      setReposts((prevPosts) => prevPosts.filter(post => post._id !== postId));

      
    }

  }



  useEffect(() => {
      const fetchNotifications = async () => {
          try {
              const res = await fetch(`${API}/api/notifications`, {
                  credentials: 'include'
              })

              const data = await res.json();
              setNotifications(data || []);
          } catch (err) {
              console.error(err);
          }
      };

      fetchNotifications();
  }, []);


    return (
        <PostContext.Provider value={{ posts, fetchPosts, loading, error, hasMore, page, setPage, likePost, removeLike, setPosts, setReposts, reposts, repost, notifications, unrepost }}>
        {children}
      </PostContext.Provider>
    )
}
