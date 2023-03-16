import React, { useEffect, useState, useRef, useCallback } from 'react'
import Post from '../components/Post';
import { useParams, Link } from 'react-router-dom'
import { getPostPage } from '../api/axios';
import useFriends from '../hooks/useFriends';
import usePosts from '../hooks/usePosts';


function User() {

    const [data, setData] = useState()
    const { id } = useParams();
    const [pageNum, setPageNum] = useState(1)

    useEffect(() => {
        const loadData = async () => {
            const res = await getPostPage(id);
            setData(res)
        }
        loadData();
    }, [id])

    const {
        isLoading, 
        isError,
        error,
        results,
        hasNextPage
      } = useFriends(pageNum, 20, id)

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

    let content = results.map((post, i) => {
      if(results.length === i + 1) {
        return <Post ref={lastPostRef} key={post.id} post={post}/>
      }
      return <Post key={post.id} post={post}/>
    })    

  return (
    data &&
    <div className='border-x-2 border-x-solid border-[#ccc] pt-12 pl-6 text-[1.2rem]'>
        <div className='flex flex-row justify-start'>
            <img className='h-[300px] mr-4 flex-2' src={`${data.imageUrl}?v=${id}`} />
            <fieldset className='border-black border-[1px] px-4 mr-4 flex-1'>
                <legend className='ml-2'>Info</legend>
                <h1 className='font-bold pt-2'>{data.prefix} {data.name} {data.lastName}</h1>
                <h2 className='mb-6'>{data.title}</h2>
                <h2><span className='underline'>Email:</span> {data.email}</h2>
                <h2><span className='underline'>IP Address:</span> {data.ip}</h2>
                <h2><span className='underline'>Job Area:</span> {data.jobArea}</h2>
                <h2><span className='underline'>Job Type:</span> {data.jobType}</h2>
                <h2><span className='underline'>Job Descriptor:</span> {data.jobDescriptor}</h2>
            </fieldset>
            <fieldset className='border-black border-[1px] px-4 flex-2 mr-4'>
                <legend className='ml-2'>Address</legend>
                <h1 className='font-bold pt-2'>{data.company.name} {data.company.prefix}</h1>
                <h2><span className='underline'>City:</span> {data.address.city}</h2>
                <h2><span className='underline'>Country:</span> {data.address.country}</h2>
                <h2><span className='underline'>State:</span> {data.address.state}</h2>
                <h2><span className='underline'>Street Address:</span> {data.address.streetAddress}</h2>
                <h2><span className='underline'>ZIP:</span> {data.address.zipCode}</h2>
            </fieldset>
        </div>
        <h1 className='text-[2rem] font-bold mt-[6rem]'>Friends:</h1>
        <div className='flex flex-row justify-start flex-wrap'>
            {content}
        </div>
    </div>
  )
}

export default User