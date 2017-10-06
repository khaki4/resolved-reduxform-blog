import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_KEY = process.env.REACT_APP_API_KEY

export const getPosts = () =>
  axios.get(`${BASE_URL}/posts/${API_KEY}`)
  export const getOnePost = (id) =>
  axios.get(`${BASE_URL}/posts/${id}${API_KEY}`)
export const createPost = (value) =>
  axios.post(`${BASE_URL}/posts/${API_KEY}`, value)
export const destoryPost = (id) =>
  axios.delete(`${BASE_URL}/posts/${id}${API_KEY}`)