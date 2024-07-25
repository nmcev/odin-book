export interface IconProps {
    w?: number,
    h?: number,
    liked?: boolean
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
    likes: string[],
    comments: Comment[]
}

export interface author {
    _id: string,
    username: string,
    profilePic: string
}


export interface PostProps {
    post: PostInterface
    page?: Page,
    onLike?: () => void;
}

export enum Page {
    IndexPage = 'IndexPage',
    PostPage = 'PostPage'
}
  
export interface PostContextProps {
    posts: PostInterface[];
    fetchPosts: (page: number, isLoggedIn: boolean) => Promise<void>;
    loading: boolean;
    error: unknown;
    hasMore: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number,
    likePost: (postId: string, userId: string) => void
}
  

export interface User {
    username: string,
    bio: string,
    profilePic: string,
    name: string,
    _id: string,
    followers?: User[];
    following?: User[];
    posts?: PostInterface[]; 
    repostedPosts?: PostInterface[]; 
}

interface Comment {
    _id: string;
    author: User;
    content: string
    createdAt: Date;
}