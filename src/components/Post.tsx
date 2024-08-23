import React, {useState, useEffect, useContext} from 'react'
import { LikeIcon } from '../assets/icons/Post/LikeIcon'
import { CommentIcon } from '../assets/icons/Post/CommentIcon'
import { RepostIcon } from '../assets/icons/Post/RepostIcon'
import { DotsIcons } from '../assets/icons/Post/DotsIcons'
import clsx from 'clsx'
import { Page, PostProps, PostInterface } from '../types'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import moment from 'moment'
import { Dialog } from './Dialog'
import { PostContext } from '../contexts/PostContext'




export const Post: React.FC<PostProps> = ({ post, page, onLike, edit }) => {


  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const [openedDialog, setOpenDialog] = useState(false);
  const {repost, reposts, unrepost} = useContext(PostContext) || {}

  const currentUser = useContext(AuthContext)?.user 
  const currentUserId = currentUser?._id
  
  const [liked, setLiked] = useState<boolean>(post.likes.includes(currentUserId ?? ''));
  const [reposted, setReposted] = useState<boolean>(currentUser?.repostedPosts?.some(repostedPost => repostedPost._id === post._id) ?? true);

  const navigate = useNavigate();
    const handleClick = () => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 200);
    };

    const handleLike = () => {
      onLike?.();
      setLiked(prev => !prev); 
    };
  

    return (
    

<div className='grid grid-cols-7 px-5 py-5 max-w-lg '>

    <Link to={`/${post.author.username}`} className="col-span-1 ">
          <img src={post.author.profilePic}
            className="rounded-full w-9 h-9 object-cover" 
            alt="User Avatar" />
    </Link>



        <div className="col-span-6 space-y-2">

      
        <div className=' flex gap-2 items-center justify-between '>

            <div className='flex flex-col'>
          <Link to={`/${post.author.username}`} className='font-bold text-[15px] animate-none'>
                {post.author.username}
          </Link>
            
            <small className='text-[#3a3a3ada]'>{moment(post.createdAt).format('MMMM Do YYYY')}</small>

          </div>
          
            <div onClick={handleClick} className={clsx('cursor-pointer hover:bg-[rgba(219,219,219,0.41)] p-2 rounded-full', { 'bounce': isBouncing })}>
              { edit && 
                <DotsIcons />
              }
            </div>
        </div>


      <div className=' cursor-pointer p-5' onClick={() => navigate(`/${post.author.username}/${post._id}`) }>
    <p className='text-[15px] mb-2'>{post.content}</p>
      {post.media && (
           <>
              
            {!isImageLoaded && (
              <div className="placeholder" style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0' }}></div>
             )}
            
                <div className='max-w-lg h-72'>
              <img src={post.media}
              onLoad={() => setIsImageLoaded(true)}
              style={{ display: isImageLoaded ? 'block' : 'none', objectFit: 'cover', maxWidth: '100%', maxHeight: '300px' }}
              className='object-cover' />
               </div>

</>
    )}
</div>


       <div className=' flex gap-4'>
            <div className='flex gap-1 items-center'>
              <div onClick={() => {

                currentUserId ? handleLike() : setOpenDialog(true)
              }
                
              }>
                <LikeIcon liked={liked} />

              </div>
              <span className=' font-normal select-none  text-[#424242]  text-xs text-start'>{post.likes.length}</span>
            </div>
            { openedDialog && 
                 <Dialog message="You need to log in to do this action." onClose={() => setOpenDialog(false)} />

            }
            
          {  page !== Page.PostPage &&        
            <Link className='flex gap-1 items-center' to={`/${post.author}/${post._id}`} >
            <CommentIcon />
              <span className=' font-normal  text-[#424242]  text-xs text-start'>{post.comments.length}</span>
              </Link>
            }

              
            <div className='flex gap-1 items-center' onClick={async () => {
              if (  repost && !reposts?.some((repostedPost: PostInterface)  => repostedPost._id === post._id)) {
                setReposted(true); 
                await repost(post._id);
                
              } else if (unrepost) {
                setReposted(false); 

                await unrepost(post._id)
              }
     }}>
            <RepostIcon reposted={reposted} />
            </div>


        </div>

        </div>
      </div>



  )
}

