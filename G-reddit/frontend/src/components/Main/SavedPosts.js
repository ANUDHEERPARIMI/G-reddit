import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import styles from '../Dashboard/styles.module.css'

const SavedPosts = () => {
  const [comment,setcomment] = useState('')
  const [postts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/savedpost");
      console.log(response.data)
      const filtered = response.data.filter(postts => postts.savedby.includes(localStorage.getItem("token")));
      setPosts(filtered);
      setLoading(false)
    };

    fetchPosts();
  }, []);

  const handleaddcomment = (postt, i, event) => {
    event.preventDefault()
    try{
      console.log(comment)
      axios
        .post("/api/subgreddit/comments", { post: postt, comment: comment})
        .catch((err) => console.log(err));

      let updated = [...postts]
      updated[i].comments.push(comment)
      setPosts(updated)
      setcomment('')
    }
    catch(error){
      console.log(error)
    }
  }

  const handleupvote = async(id, iii) => {
    axios
      .post("/api/subgreddit/upvote", { post: id, name: localStorage.getItem("token")})
      .catch((err) => console.log(err));

      let updated = [...postts]
      updated[iii].upvotecount += 1
      setPosts(updated)
  }

  const handledownvote = async(id, iii) => {
    axios
      .post("/api/subgreddit/downvote", { post: id, name: localStorage.getItem("token")})
      .catch((err) => console.log(err));

      let updated = [...postts]
      updated[iii].downvotecount += 1
      setPosts(updated)
  }

  const handleUnsavePost = async(postid, i) => {
    try{
      let p = "/api/savedpost/"
      p = p.concat(postid)
      axios.delete(p, {params: {email: localStorage.getItem("token")}})
      
      let updated = [...postts]
      updated[i].savedby = updated[i].savedby.filter((element) => element != localStorage.getItem('token'))
      setPosts(updated)
      show()
    }
    catch(error)
    {
      console.log(error)
    }
  }

  const show = () => {
    console.log(postts)
  }

  const handleSavePost = async(id, i) => {
    axios
      .post("/api/savedpost", { post: id, name: localStorage.getItem("token")})
      .catch((err) => console.log(err));

      let updated = [...postts]
      updated[i].savedby.push(localStorage.getItem('token'))
      setPosts(updated)
}
  
  return (
    <div>
        <Navbar />
        {loading && <div className={styles.loaderContainer}>
                        <div className={styles.loader}></div>
                      </div>}
        {!loading &&
        <div style={{backgroundColor: '#f4f4f4'}}>
        {postts.length > 0 ? (
          <h2 style={{marginTop: '0', paddingTop: '40px', paddingRight: '640px'}}>Posts:</h2>
          ) : (
          <h2 style={{marginTop: '0', paddingTop: '40px', paddingRight: '640px'}}>No posts yet!!</h2>
        )}
      <ul className={styles.postsContainer} style={{listStyle: 'none'}}>
              {postts.map((post,i) => (
                <li key={post._id} className={styles.postItem}>
                  <div className={styles.postContent}>
                    <h2 className={styles.subreddit}>Subforum: {post.subreddit}</h2>
                    <p className={styles.author}>Author: {post.author}</p>
                    <div className={styles.back}>
                    <h3 className={styles.title}>{post.title}</h3>
                    <div className={styles.content}>
                      <p>{post.textSubmission}</p>
                    </div>
                    {post.image && (
                      <img
                        className={styles.postImage}
                        src={post.image}
                        alt={`Post by ${post.author}`}
                      />
                    )}
                    </div>
                    <div className={styles.votes}>
                      <span style={{paddingRight: '10px'}} className={styles.upvotes} id={i}>Upvotes: {post.upvotecount}</span>
                      <span style={{paddingLeft: '10px'}} className={styles.downvotes} id={i}>Downvotes: {post.downvotecount}</span>
                    </div>
                    <div className={styles.buttonsContainer}>
                      {post.savedby.includes(localStorage.getItem('token')) ? (
                        <button onClick={(event) => handleUnsavePost(post._id, i)}>Unsave post</button>
                      ) : (
                        <button onClick={(event) => handleSavePost(post._id, i)}>Save Post</button>
                      )}
                    </div>
                    <div className={styles.buttonsContainer} style={{marginBottom: '20px'}}>
                      <button onClick={(event) => handleupvote(post._id, i)}>Upvote</button>
                      <button onClick={(event) => handledownvote(post._id, i)}>Downvote</button>
                    </div>
                    <div>
                      <br/>
                      <form onSubmit={(event) => handleaddcomment(post._id, i, event)}>
                        <div>
                          <label htmlFor="comment">Add Comment: </label>
                          <input
                            id="comment"
                            value={comment}
                            onChange={(event) => setcomment(event.target.value)}
                            required
                          />
                        </div>
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                  <div className={styles.commentsContainer}>
                    <h3>Comments: </h3>
                    <h3>{post.comments.length}</h3>
                    <ul className={styles.commentsList}>
                      {post.comments.map((comment, index) => (
                        <li key={index} className={styles.commentItem}>
                          {comment}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
        </div> }
    </div>
  );
}; 
export default SavedPosts;
