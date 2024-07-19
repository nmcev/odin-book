import { useContext, useEffect } from "react";
import { Post } from "../components/Post";
import { PostContext } from "../contexts/PostContext";

export const HomePage = () => {
  const postContext = useContext(PostContext);


  const handleScroll = () => {
    const isScrollAtBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;

    if (isScrollAtBottom && !postContext?.loading && postContext?.hasMore) {
      postContext.setPage((prevPage) => prevPage + 1);
    }
  };

  
  useEffect(() => {
  
    postContext?.fetchPosts(postContext.page, false)
 }, [postContext?.page])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [postContext?.loading, postContext?.hasMore]);


  return (
    <div className="min-h-screen mt-24 flex items-center flex-col divide-y-[1.5px] gap-2">
      {postContext?.posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}

      {postContext?.loading && <div>Loading...</div>}

      {!postContext?.hasMore && <div>No more content</div>}

      {postContext?.hasMore && <div>Error...</div>}
    </div>
  );
};
