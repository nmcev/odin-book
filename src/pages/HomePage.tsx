import { useCallback, useContext, useEffect } from "react";
import { Post } from "../components/Post";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { Page } from "../types";

export const HomePage = () => {
  const postContext = useContext(PostContext);
  const auth = useContext(AuthContext);


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


  return (
    <div className="min-h-screen mt-24 flex items-center flex-col divide-y-[1.5px] gap-2">
      {postContext?.posts.map((post) => (
        <Post key={post._id} post={post} page={Page.IndexPage}  />
      ))}

      {!postContext?.hasMore && <h1>No more content</h1>}
      {postContext?.loading && <h1>Loading</h1>}

    </div>
  );
};
