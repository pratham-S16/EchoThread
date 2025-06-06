import React from 'react'
import conf from '../conf/conf'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard(
  {  $id,
    title,
    featuredImage,
    }
) {
  // .href
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 hover:scale-105 hover:ease-in hover:duration-175'>
            <div className='w-full justify-center mb-4'>
              {/* {  console.log("PostCard Image Preview:", appwriteService.getFilePreview(featuredImage))}  error detected from this line as free appwrite version wont support getFilepreview so instead use FileView  */}
            <img src={ appwriteService.getFilePreview(featuredImage) } alt={title} className='className="w-full h-48 object-cover rounded-xl"'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard