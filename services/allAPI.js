import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverURL"


export const register = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/signup`,reqBody)
  }

export const login=async(reqBody)=>{
  return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}
//working

export const userdetails =async (reqBody)=>{
  return await commonAPI("GET",`${SERVER_URL}/`,reqBody)
}

export const searchUserAPI = async (searchKey,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/usersearch?search=${searchKey}`,"",reqHeader)
}

export const getAllUsersAPI = async (searchKey,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/search?search=${searchKey}`,"",reqHeader)
}

//add post
 export const addPostAPI = async (reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/add-post`,reqBody,reqHeader)
}

export const getUserPostsAPI = async (reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/user-post`,"",reqHeader)
}

export const addCommentAPI = async (reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/add-comment`,reqBody,reqHeader)
}