import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../Navbar';
import axios from 'axios';
import styles from "./styles.module.css";

function Dashboard()
{

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([]);
    const [reporting,setreport] = useState(false)
    const [concern, setconcern] = useState('')
    const [comment,setcomment] = useState('')
    const [loading, setLoading] = useState(true)
    const [nameform, setnameform] = useState({subreddit: useParams().id});

    useEffect(() => {
        const fetchPosts = async() => {
            try{
              const response = await axios.get("/api/dashboard", {
                  params: { email: localStorage.getItem("token") },
              })
              response.data.sort((a,b) => (a.updatedAt < b.updatedAt)? 1:-1)
              // console.log(typeof response.data[0].upvotecount)
              const userr = await axios.get("/api/users", {params: {email: localStorage.getItem("token")}})
              setUser(userr.data)
              setPosts(response.data)
              setLoading(false)
            }
            catch(error){
                console.log(error)
            }
        };

        fetchPosts();
    }, [])

    const handleSavePost = async(id, i) => {
        axios
          .post("/api/savedpost", { post: id, name: localStorage.getItem("token")})
          .catch((err) => console.log(err));

          let updated = [...posts]
          updated[i].savedby.push(localStorage.getItem('token'))
          setPosts(updated)
    }

    const handleUnsavePost = async(id, i) => {
      let p = "/api/savedpost/"
      p = p.concat(id)
      axios
      .delete(p, {params: {email: localStorage.getItem("token")}})
      .catch((err) => console.log(err));

      let updated = [...posts]
      updated[i].savedby = updated[i].savedby.filter((element) => element != localStorage.getItem('token'))
      setPosts(updated)
    }

    const handleupvote = async(id, iii) => {
        axios
          .post("/api/subgreddit/upvote", { post: id, name: localStorage.getItem("token")})
          .catch((err) => console.log(err));
          console.log('ok')
          let updated = [...posts]
          updated[iii].upvotecount += 1
          setPosts(updated)
    }

    const handledownvote = async(id, iii) => {
        axios
            .post("/api/subgreddit/downvote", { post: id, name: localStorage.getItem("token")})
            .catch((err) => console.log(err));
            // setPosts(posts => posts.map((posttt, i) => i === iii ? incdown: posttt))
            let updated = [...posts]
            updated[iii].downvotecount += 1
            setPosts(updated)
            // const post = document.getElementById(i).getElementsByClassName('styles.downvotes')
    }

    const handleaddcomment = (postt, i, event) => {
        event.preventDefault()
        try{
            console.log(comment)
            axios
                .post("/api/subgreddit/comments", { post: postt, comment: comment})
                .catch((err) => console.log(err));

            let updated = [...posts]
            updated[i].comments.push(comment)
            setPosts(updated)
            setcomment('')
        }
        catch(error){
            console.log(error)
        }
    }

    const handleFollow = async(email) => {
        try{
            const data = {
                email: email,
                email2: localStorage.getItem("token")
            }
            axios.post("/api/users/followers", data)
        }
        catch(error){
            console.log(error)
        }

        let updated = {...user}
        updated.following.push(email)
        console.log(updated)
        setUser(updated)
    }

    const handleUnfollow = async(email) => {
      axios
      .delete('api/users/followers', {params: {email, email2: localStorage.getItem("token")}})
      .catch((err) => console.log(err))

      let updated = {...user}
      updated.following = updated.following.filter((element) => element != email)
      setUser(updated)
    }

    const handleaddreport = async(id, subredd) => {
        setreport(false)
        const data = {
          id: id,
          reporter: localStorage.getItem("token"),
          concern: concern,
          subreddit: subredd,
        }
        const response = axios.post("/api/dashboard", {params: data})
        setconcern('')
        
    }

    const handlereportbutton = () => {
        setreport(!reporting)
    }

    return (
        <div>
          <Navbar />
          {loading && <div className={styles.loaderContainer}>
                        <div className={styles.loader}></div>
                      </div>}
          {!loading &&
          <div style={{backgroundColor: '#f4f4f4'}}>
          {posts.length > 0 ? (
              <h2 style={{marginTop: '0', paddingTop: '40px', paddingRight: '640px'}}>Latest updates from the forums you follow:</h2>
              ) : (
              <h2 style={{marginTop: '0', paddingTop: '40px', paddingRight: '640px'}}>You don't follow any forums!!</h2>
          )}
            <ul className={styles.postsContainer} style={{listStyle: 'none'}}>
              {posts.map((post,i) => (
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
                      {user.following.includes(post.author) ? (
                        <button onClick={(event) => handleUnfollow(post.author)}>Unfollow</button>
                      ) : (
                        <button onClick={(event) => handleFollow(post.author)}>Follow</button>
                      )}
                      {post.savedby.includes(localStorage.getItem('token')) ? (
                        <button onClick={(event) => handleUnsavePost(post._id, i)}>Unsave post</button>
                      ) : (
                        <button onClick={(event) => handleSavePost(post._id, i)}>Save post</button>
                      )}
                    </div>
                    <div className={styles.buttonsContainer} style={{marginBottom: '20px'}}>
                      <button onClick={(event) => handleupvote(post._id, i)}>Upvote</button>
                      <button onClick={(event) => handledownvote(post._id, i)}>Downvote</button>
                      <button onClick={(event) => handlereportbutton()} className={styles.report}>
                        Report
                      </button>
                    </div>
                    {reporting && (
                      <form onSubmit={(event) => handleaddreport(post._id, post.subreddit)} className={styles.form}>
                        <div>
                          <label htmlFor="report">Add concern:   </label>
                          <input
                            id="report"
                            value={concern}
                            onChange={(event) => setconcern(event.target.value)}
                            required
                          />
                        </div>
                        <button type="submit">Submit Report</button>
                      </form>
                    )}
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

}

export default Dashboard