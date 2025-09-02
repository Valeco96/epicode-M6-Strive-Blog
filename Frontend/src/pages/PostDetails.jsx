import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../data/post";

function PostDetails() {
  const { id } = useParams();

  const [singlePost, setSinglePost] = useState();

  useEffect(() => {
    getPost();
  }, [id]);

  async function getPost() {
    const singlePostresults = await getSinglePost(id);
    setSinglePost(singlePostresults);
  }

  return (
    <>
      <SinglePost post={singlePost} />
    </>
  );
}

export default PostDetails();
