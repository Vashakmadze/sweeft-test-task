import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPostsPage, getFriendsPage} from "../api/axios";

const useFriends = (pageNum = 1, pageItems = 20, id) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)
    const location = useLocation();


    // initial load based on the id 
    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();
        const { signal } = controller;

        getFriendsPage(id, pageNum, pageItems, { signal })
        .then(data => {
            setResults(prev => [...prev, ...data])
            setHasNextPage(Boolean(data.length))
            setIsLoading(false)
        })
        .catch(e => {
            setIsLoading(false)
            if(signal.aborted) return
            setIsError(true)
            setError({message: e.message})
        })

        return () => controller.abort()
    }, [pageNum])

    // changing friends based on the id change
    useEffect(() => {
        getFriendsPage(id, pageNum, pageItems)
        .then(data => {
            setResults([...data])
            setIsLoading(false)
        })
        .catch(e => {
            setIsLoading(false)
            setIsError(true)
            setError({message: e.message})
        })
    }, [id])

    return { isLoading, isError, error, results, hasNextPage}
}

export default useFriends;