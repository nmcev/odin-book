export interface IconProps {
    w?: number,
    h?: number,
}
export interface NavItemProps {
    children: React.ReactNode,
    to: string,
}

export interface PostInterface{
    _id: string,
    content: string,
    media: string,
    author: author,
    likes: number,
}

export interface author {
    username: string,
    profilePic: string
}


export interface PostProps {
    post: PostInterface
}
  
export interface PostContextProps {
    posts: PostInterface[];
    fetchPosts: (page: number, isLoggedIn: boolean) => Promise<void>;
    loading: boolean;
    error: unknown;
    hasMore: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number
}
  

export interface User {
    username: string,
    bio: string,
    profilePic: string,
    name: string,
    _id: string,
    followers?: [] | undefined
}
