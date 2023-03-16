import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom';

const Post = forwardRef(({ post }, ref) => {
        
    const postBody = (
        <Link to={`/user/${post.id}`}>
            <img className='max-w-[100%]' src={`${post.imageUrl}?v=${post.id}`} />
            <h1 className='font-bold pl-4 pt-2'>{post.prefix} {post.name} {post.lastName}</h1>
            <h2 className='pl-4'>{post.title}</h2>
        </Link>
    )

    const content = ref
        ? <article ref={ref}
        className="solid border-solid border-2
        sm:w-[23%] w-[50%] m-2 text-lg cursor-pointer">{postBody}</article>
        : <article className="solid border-solid border-2
        sm:w-[23%] w-[50%] m-2 text-lg cursor-pointer">{postBody}</article>

    return content
})  

export default Post