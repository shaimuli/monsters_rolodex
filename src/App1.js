import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./components/posts/post.component";
import Pagination from "./components/posts/pagination.component";

const App1 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  //change page

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3"> My blog </h1>
      <Posts posts={currentPost} loading={loading}></Posts>
      <Pagination
        postPerPage={postPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      ></Pagination>
    </div>
  );
};
export default App1;
