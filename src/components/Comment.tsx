import React from 'react'
import moment from 'moment'
import { CommentInterface } from '../types'

interface CommentProps {
    comment: CommentInterface
}
export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
        <div key={comment._id} className="p-4 items-center max-w-lg flex gap-4">
            <img src={comment.author.profilePic} alt="Profile" className="rounded-full w-10 h-10 object-cover" />
            <div className="flex-1">
                <div>
                    <h2 className="text-[15px] font-bold">{comment.author.username}</h2>
                    <span className="text-xs text-gray-500 block">
                        {moment(comment.createdAt).format('MMMM Do YYYY')}
                    </span>
                </div>
                <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
        </div>
  )
}
