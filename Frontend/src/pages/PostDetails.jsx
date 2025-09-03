import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../data/post";
import SinglePost from "../components/SinglePost";

function PostDetails() {
  const { postId } = useParams();

  const [singlePost, setSinglePost] = useState();

  useEffect(() => {
    getPost();
    console.log("Fetching post...");
  }, [postId]);

  async function getPost() {
    const singlePostresults = await getSinglePost(postId);
    setSinglePost(singlePostresults);
  }

  console.log(postId);

  return <>{singlePost && <SinglePost post={singlePost} withLinks />}</>;
}

export default PostDetails;
