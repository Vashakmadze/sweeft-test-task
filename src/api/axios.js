import axios from "axios";

export const api = axios.create({
    baseURL: 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/'
})

export const getPostsPage = async (pageParam = 1, pageItems = 20, options = {}) => {
    const response = await api.get(`/user/${pageParam}/${pageItems}`, options)
    return response.data.list
}

export const getPostPage = async (id, options = {} ) => {
    const response = await api.get(`/user/${id}`, options)
    return response.data
}

export const getFriendsPage = async(id, pageParam = 1, pageItems = 20, options = {}) => {
    const response = await api.get(`/user/${id}/friends/${pageParam}/${pageItems}`, options)
    return response.data.list;
}