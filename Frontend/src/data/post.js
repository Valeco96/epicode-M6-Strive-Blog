import axios from "./axios.js";

export async function getAllPosts(token) {
  try {
    const response = await axios.get("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getSinglePost(id, token) {
  try {
    const response = await axios.get(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createPost(newPost, token) {
  try {
    const response = await axios.post(`/posts`, newPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function editPost(id, postData, token) {
  try {
    const response = await axios.patch(`/posts/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(postId, token) {
  try {
    const response = await axios.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const updateCover = async (id, coverFile, token) => {
  try {
    const formData = new FormData();
    formData.append("cover", coverFile);
    const response = await axios.patch(`/posts/${id}/cover`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
