export interface IconProps {
    w?: number,
    h?: number,
    liked?: boolean
    reposted?: boolean,
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
    comments: CommentInterface[],
    createdAt: Date,
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
    removeLike: (postId: string, userId: string) => void
    setPosts: React.Dispatch<React.SetStateAction<PostInterface[]>>;
    reposts: PostInterface[];
    setReposts: React.Dispatch<React.SetStateAction<PostInterface[]>>;
    repost: (postId: string) => Promise<void>; 
    notifications: NotificationType[];

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

export interface CommentInterface {
    _id: string;
    author: User;
    content: string
    createdAt: Date;
}

export interface NotificationType {
    user: User,
    _id: string,
    type: string,
    post: PostInterface,
    recipient: User,
    createdAt: Date,
    isRead: boolean
}
