import React from 'react'
import { useState, useRef, useCallback } from 'react'
import usePosts from '../hooks/usePosts'
import Post from '../components/Post'

function Home() {
    const [pageNum, setPageNum] = useState(1)
    const {
      isLoading, 
      isError,
      error,
      results,
      hasNextPage
    } = usePosts(pageNum)
  
    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
      if(isLoading) return
  
      if(intObserver.current) intObserver.current.disconnect()
  
      intObserver.current = new IntersectionObserver(posts => {
        if(posts[0].isIntersecting && hasNextPage) {
          setPageNum(prev => prev + 1)
        }
      })
  
      if(post) intObserver.current.observe(post)
    }, [isLoading, hasNextPage])
    
    if (isError) return <p>Error: {error.message}</p>
  
    const content = results.map((post, i) => {
      if(results.length === i + 1) {
        return <Post ref={lastPostRef} key={post.id} post={post}/>
      }
      return <Post key={post.id} post={post}/>
    })
  
  return (
    <>
        <main className='flex flex-row justify-center flex-wrap'>
        {content} 
        </main>
        {isLoading && <p>Loading More Posts.....</p>}
    </>
  )
}

export default Home