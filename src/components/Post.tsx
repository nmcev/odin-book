import React, {useState} from 'react'
import { LikeIcon } from '../assets/icons/Post/LikeIcon'
import { CommentIcon } from '../assets/icons/Post/CommentIcon'
import { RepostIcon } from '../assets/icons/Post/RepostIcon'
import { DotsIcons } from '../assets/icons/Post/DotsIcons'
import clsx from 'clsx'
import { PostProps } from '../types'




export const Post: React.FC<PostProps> = ({post}) => {

    const [isBouncing, setIsBouncing] = useState(false);

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


        <div className='pb-4'>
    <p className='text-[15px] mb-2'>{post.content}</p>
            {post.media && (
   
          <img src={post.media} className='object-cover' style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }} />

    )}
</div>


       <div className=' flex gap-4'>
            <div className='flex gap-1 items-center'>
              <LikeIcon />
              <span className=' font-normal  text-[#424242]  text-xs text-start'>{post.likes}</span>
            </div>
            
              
            <div className='flex gap-1 items-center'>
            <CommentIcon />
              <span className=' font-normal  text-[#424242]  text-xs text-start'>{post.comments.length}</span>
            </div>

              
            <div className='flex gap-1 items-center'>
            <RepostIcon />
            </div>


        </div>

        </div>
      </div>



  )
}

