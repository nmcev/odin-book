export interface IconProps {
    w?: number,
    h?: number,
}
export interface NavItemProps {
    children: React.ReactNode,
    to: string,
}

export interface PostInterface{
    _id: number,
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
  