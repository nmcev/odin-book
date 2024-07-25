import React, {useState} from 'react'
import { LikeIcon } from '../assets/icons/Post/LikeIcon'
import { CommentIcon } from '../assets/icons/Post/CommentIcon'
import { RepostIcon } from '../assets/icons/Post/RepostIcon'
import { DotsIcons } from '../assets/icons/Post/DotsIcons'
import clsx from 'clsx'
import { Page, PostProps } from '../types'
import { useNavigate } from 'react-router-dom'




export const Post: React.FC<PostProps> = ({post, page,  onLike}) => {


  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const navigate = useNavigate();
    const handleClick = () => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 200);
    };

    return (
    

<div className='grid grid-cols-7 px-5 py-5 max-w-lg '>

    <div className="col-span-1 ">
          <img src={post.author.profilePic} className='rounded-full' alt="User Avatar" width={36} />
    </div>



        <div className="col-span-6 space-y-2">

      
        <div className=' flex gap-2 items-center justify-between '>

          <div className='font-bold text-[15px] animate-none'>
                {post.author.username}
            </div>
            
            <div onClick={handleClick} className={clsx('cursor-pointer hover:bg-[rgba(219,219,219,0.41)] p-2 rounded-full', {'bounce' : isBouncing})}>
              <DotsIcons />
            </div>
        </div>


      <div className=' cursor-pointer p-5' onClick={() => navigate(`/${post.author.username}/${post._id}`) }>
    <p className='text-[15px] mb-2'>{post.content}</p>
      {post.media && (
           <>
              
            {!isImageLoaded && (
              <div className="placeholder" style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0' }}></div>
             )}
            
              <img src={post.media}
              onLoad={() => setIsImageLoaded(true)}
              style={{ display: isImageLoaded ? 'block' : 'none', objectFit: 'cover', maxWidth: '100%', maxHeight: '300px' }}
              className='object-cover' />

</>
    )}
</div>


       <div className=' flex gap-4'>
            <div className='flex gap-1 items-center'>
              <div onClick={onLike}>
              <LikeIcon />

              </div>
              <span className=' font-normal  text-[#424242]  text-xs text-start'>{post.likes.length}</span>
            </div>
            
          {  page === Page.IndexPage &&        
            <div className='flex gap-1 items-center'>
            <CommentIcon />
              <span className=' font-normal  text-[#424242]  text-xs text-start'>{post.comments.length}</span>
              </div>
            }

              
            <div className='flex gap-1 items-center'>
            <RepostIcon />
            </div>


        </div>

        </div>
      </div>



  )
}

