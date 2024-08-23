import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { PostInterface, PostContextProps, NotificationType } from "../types";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext<PostContextProps | null>(null)

interface PostProviderProps {
    children: ReactNode;
}


export const PostProvider: React.FC<PostProviderProps> = ({ children  }) => { 


  const currentUser = useContext(AuthContext)?.user;
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [reposts, setReposts] = useState<PostInterface[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(true);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const fetchPosts = async (page: number, isLoggedIn: boolean) => {
    setLoading(true);
    setError(null);
      try {
        const endpoint = isLoggedIn ? `http://localhost:3000/api/posts/user?page=${page}&limit=10` : `http://localhost:3000/api/posts?page=${page}&limit=10`;

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

      const res = await fetch(`http://localhost:3000/api/posts/like/${postId}`, {
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
  
        const res = await fetch(`http://localhost:3000/api/posts/unlike/${postId}`, {
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
    
    const res = await fetch('http://localhost:3000/api/reposts', {
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
    
        return postExists ? prevPosts : [...prevPosts , repostedPost]
    });
    }
  } 



  useEffect(() => {
      const fetchNotifications = async () => {
          try {
              const res = await fetch('http://localhost:3000/api/notifications', {
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
        <PostContext.Provider value={{ posts, fetchPosts, loading, error, hasMore, page, setPage, likePost, removeLike, setPosts, setReposts, reposts, repost, notifications }}>
        {children}
      </PostContext.Provider>
    )
}
