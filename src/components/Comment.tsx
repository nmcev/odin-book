import React from 'react'
import moment from 'moment'
import { CommentInterface } from '../types'
import { Link } from 'react-router-dom'

interface CommentProps {
    comment: CommentInterface
}
export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
        <div key={comment._id} className="p-4 items-center max-w-lg flex gap-4">
            <img src={comment.author.profilePic} alt="Profile" className="rounded-full w-10 h-10 object-cover" />
            <div className="flex-1">
                <div>
                    <Link className="text-[15px] font-bold max-sm:text-sm" to={`/${comment.author.username}`}>{comment.author.username}</Link>
                    <span className="text-xs text-gray-500 block">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                <p className="mt-1 text-gray-700 dark:text-white max-sm:text-sm">{comment.content}</p>
            </div>
        </div>
  )
}
