import React, { createContext, useState, ReactNode } from "react";
import { PostInterface, PostContextProps } from "../types";

export const PostContext = createContext<PostContextProps | null>(null)

interface PostProviderProps {
    children: ReactNode;
}
  
export const PostProvider: React.FC<PostProviderProps> = ({ children  }) => { 


  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

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


    return (
        <PostContext.Provider value={{ posts, fetchPosts, loading, error, hasMore, page, setPage, likePost }}>
        {children}
      </PostContext.Provider>
    )
}
