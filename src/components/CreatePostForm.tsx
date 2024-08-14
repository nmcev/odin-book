import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const CreatePostForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      
    }
  }

  const postPostData = async (imgUrl?: string, content?: string) => {
    
    try {
      const res = await fetch('http://localhost:3000/api/posts', {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
      },  
        body: JSON.stringify({ media: imgUrl, content })
      })

      if (res.ok) {
        navigate('/')
      }
    } catch(e) {
      console.error(e);
    } 
  }

  const handleSubmitPost =  async() => {
    
    // case where there is an image attached with the post
    if (img) {
      const formData = new FormData();

      formData.append('file', img);
      formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESETS);
      

      const cloudinaryFetch = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PRESESTS_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    });      
    
      const result = await cloudinaryFetch.json();

      if (result.secure_url) {
        postPostData(result.secure_url, content)
      }
    } else {
      postPostData('', content)
    }
  }

    return (
      <>
<div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>

      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <textarea  onChange={(e) =>  setContent(e.target.value)} value={content} className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="true" placeholder="What's on your mind right now🤔?"></textarea>

          <div className="icons flex text-gray-500 m-2">
          <label>
            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              
            </svg>
            <input
              type="file"
              accept="image/*"
               onChange={handleImgChange}
                className="my-2 hidden"
                />

            </label>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">{content.length}/300</div>
          </div>

 
          {
            img && (
              <h2>{img.name} <br /> <small>{(img.size / 1024).toFixed(2)} kb</small></h2>
              
            )
          }
           {imagePreview && (
            <div className="image-preview mt-4 max-w-sm">
                <img
                    src={imagePreview}
                    alt="Selected Preview"
                    className="max-w-full h-auto"
                />
            </div>
        )}
          
        <div className="buttons flex">
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
          <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" onClick={handleSubmitPost}>Post</div>
        </div>
         </div>
      </>
    )
}
