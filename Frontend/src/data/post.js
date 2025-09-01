import axios from "axios.js";

export async function getAllPosts() {
  try {
    const response = await axios.get("posts");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
