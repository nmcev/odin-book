import React from 'react'
import { CreatePostForm } from '../components/CreatePostForm'

export const CreatePostPage: React.FC = () => {
    return (
        <div className="min-h-screen my-24 flex items-center flex-col ">
            <CreatePostForm />
      </div>
    )
}
