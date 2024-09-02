import { useCallback, useContext, useEffect } from "react";
import { Post } from "../components/Post";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { Page, PostInterface } from "../types";
import { PostSkeleton } from "../components/PostSkeleton";

export const HomePage = () => {
  const postContext = useContext(PostContext);
  const auth = useContext(AuthContext);



  const skeletonCount = 5;

  const skeletonPosts = new Array(skeletonCount).fill(<PostSkeleton />)
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
    <div className="min-h-screen sm:mt-24 mt-48 flex items-center flex-col divide-y-[1.5px] gap-2">
      {postContext?.posts.map((post) => (
        <Post key={post._id} post={post} page={Page.IndexPage} onLike={() => handleLike(post)}  />
      ))}

      {!postContext?.hasMore && <h1>No more content</h1>}
      {postContext?.loading && skeletonPosts.map((post) => (
        post
      ))}

    </div>
  );
};
