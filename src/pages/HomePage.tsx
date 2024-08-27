import { useCallback, useContext, useEffect } from "react";
import { Post } from "../components/Post";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { Page, PostInterface } from "../types";

export const HomePage = () => {
  const postContext = useContext(PostContext);
  const auth = useContext(AuthContext);


  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/events');

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      
      if (data.type === 'new_post') {
        postContext?.setPosts(prevPosts => [data.post, ...prevPosts])
      }
    }
    eventSource.onerror = function(err) {
      console.error('EventSource failed:', err);
  };

  return () => {
      eventSource.close();
  };
    
  } , [postContext])

  const handleScroll =  useCallback(() => {
    const isScrollAtBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;

    if (isScrollAtBottom && !postContext?.loading && postContext?.hasMore) {
      postContext.setPage((prevPage) => prevPage + 1);
    }
  }, [postContext])

  
  useEffect(() => {
    if (auth?.isLoggedIn !== undefined) {
      postContext?.fetchPosts(postContext.page, auth.isLoggedIn);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postContext?.page, auth?.isLoggedIn])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [postContext?.loading, postContext?.hasMore, handleScroll]);


  const handleLike = (post: PostInterface) => {

    if (auth?.user && !post?.likes.includes(auth.user._id)) {
      postContext?.likePost(post?._id ?? '', auth.user?._id ?? '');

    } else if (auth?.user?._id) {
      postContext?.removeLike(post?._id ?? '', auth?.user?._id ?? '');
      
    }
  }
  return (
    <div className="min-h-screen mt-24 flex items-center flex-col divide-y-[1.5px] gap-2">
      {postContext?.posts.map((post) => (
        <Post key={post._id} post={post} page={Page.IndexPage} onLike={() => handleLike(post)}  />
      ))}

      {!postContext?.hasMore && <h1>No more content</h1>}
      {postContext?.loading && <h1>Loading</h1>}

    </div>
  );
};
