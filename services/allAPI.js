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
export const adminallUsersAPI = async (reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/adminallusers`,"",reqHeader)
}
//add post
 export const addPostAPI = async (reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/add-post`,reqBody,reqHeader)
}

export const adddeletedpostAPI = async (poster, postId, postCaption,reporter, reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/add-admindeleted/${poster}/${postId}/:${postCaption}/:${reporter}`,'',reqHeader)
}

export const addAdminPostAPI = async (reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/admin-post`,reqBody,reqHeader)
}

export const addFlagPostAPI = async (pid,pc,reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/flag-post/${pid}/${pc}`,reqBody,reqHeader)
}

export const addFavPostAPI = async (pu,pc,reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/fav-post/${pu}/${pc}`,reqBody,reqHeader)
}

export const getflagPostsAPI = async (reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/flag-post`,"",reqHeader)
}

export const addCommentAPI = async (postId, reqBody, reqHeader) => { 
  return await commonAPI("POST", `${SERVER_URL}/add-comment/${postId}`, reqBody, reqHeader);
}
export const addFriendAPI = async (fid, reqHeader) => { 
  return await commonAPI("POST", `${SERVER_URL}/add-friend/${fid}`,"", reqHeader);
}
export const getUserPostsAPI = async (reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/user-post`,"",reqHeader)
}
export const getSearchNavigatePostsAPI = async (uid,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/search-post/${uid}`,'',reqHeader)
}
export const getPostCommentsAPI = async (postId, reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/post-comments/${postId}`,"",reqHeader)
}

export const getHomePostsAPI = async (reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/getAllPosts`,"",reqHeader)
}
export const getUsernamesAPI = async (reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/getAllUsers`,"",reqHeader)
}

export const isFriendAPI = async (fid,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/isfriend/${fid}`,'',reqHeader)
}

export const getAllFriendsAPI = async (reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/friendspage`,'',reqHeader)
}

export const isFavAPI=async (pid,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/isfav/${pid}`,reqHeader)
}

export const getfrienddetails =async (uid,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/${uid}`,'',reqHeader)
}

export const removePostAPI = async (pid,reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/remove-post/${pid}`,{},reqHeader)
}

export const removeflagAPI = async (pid,reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/remove-flag/${pid}`,{},reqHeader)
}

export const removeFriendAPI = async (fid,reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/remove-friend/${fid}`,{},reqHeader)
}

export const removecommentAPI = async (cid,reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/remove-comment/${cid}`,{},reqHeader)
}

//chat part
export const addChatAPI = async (rid,sid, reqBody, reqHeader) => { 
  return await commonAPI("POST", `${SERVER_URL}/add-chat/${rid}/${sid}`, reqBody, reqHeader);
}
export const getChatsAPI = async (receiver,sender, reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/get-chats/${receiver}/${sender}`,"",reqHeader)
}

export const luserAPI = async (reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/luser`,'',reqHeader)
}


export const editProfileAPI = async (uid,reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${SERVER_URL}/edit-profile/${uid}`,reqBody,reqHeader)
}

export const adminregister = async (reqBody)=>{
  return await commonAPI("POST",`${SERVER_URL}/adminsignup`,reqBody)
}

export const adminlogin=async(reqBody)=>{
return await commonAPI("POST",`${SERVER_URL}/adminlogin`,reqBody)
}

export const reportedPost = async (pid,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/reported-pic/${pid}`,"",reqHeader)
}

export const getAdminSearchPostsAPI = async (pid,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/adminsearch-post/${pid}`,'',reqHeader)
}

export const doespostexist = async (pid,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/doespostexist/${pid}`,'',reqHeader)
}

export const addFlagcommentAPI = async (pid,cid,reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/flag-comment/${pid}/${cid}`,reqBody,reqHeader)
}

export const editCommentAPI = async (cid,reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${SERVER_URL}/edit-comment/${cid}`,reqBody,reqHeader)
}