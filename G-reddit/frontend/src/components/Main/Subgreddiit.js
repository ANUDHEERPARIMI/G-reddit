import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Subgreddiit() {
  const [subreddits, setSubreddits] = useState([]);
  const Navigate = useNavigate()
  useEffect(() => {
    const fetchSubreddits = async () => {
      const response = await axios.get("/api/subgreddit");
     // console.log(response.data.subredditName)
     const filtered = response.data.filter(subreddit => subreddit.admin === localStorage.getItem("token"));
      setSubreddits(filtered);
    };

    fetchSubreddits();
  }, []);
  const fetchSubreddits = async () => {
    const response = await axios.get("/api/subgreddit");
   // console.log(response.data.subredditName)
   const filtered = response.data.filter(subreddit => subreddit.admin === localStorage.getItem("token"));
    setSubreddits(filtered);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/subgreddit/${id}`);
      fetchSubreddits();
    } catch (error) {
      console.log(error);
    }
  }
  const handleopen = async (location) => {
    const loc = `/allsubgreddiit/${location}`
    console.log(loc)
    Navigate(loc)
  }
  const [showForm, setShowForm] = useState(false);
  const [nameform, setnameform] = useState({ name: "", description: "", tags: [], bannedkeywords: [], admin: localStorage.getItem("token")});
  // const b = "Losetti Mourya"
  //   setnameform({ ...nameform, admin: b})
  const handleChangeName = (event) => {
    setnameform({ ...nameform, name: event.target.value})
  }
  const handleChangeDesc = (event) => {
    setnameform({ ...nameform, description: event.target.value})
  }
  const handleChangeList = (event) => {
    setnameform({...nameform, tags: event.target.value.split(',')});
  }
  const handlechangeKeywords = (event) => {
    setnameform({...nameform, bannedkeywords: event.target.value.split(',')});
  }
  const handleClick = () => {
    setShowForm(!showForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nameform.description)
		try {
			const url = "/api/subgreddit";
			const res = await axios.post(url, nameform);
      console.log("res",res.data)
			// await localStorage.setItem("subgreddittoken", res.nameform.name);
      console.log(res.nameform.name)
			// window.location = "/dashboard";
		} catch (error) {
			// if (
			// 	error.response &&
			// 	error.response.status >= 400 &&
			// 	error.response.status <= 500.
			// ) {
			// 	setError(error.response.datalogin.message);
			// }
		}
  }
  return (
    <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding:'20px' }}>
            <button onClick={handleClick} className={[styles.primary_button, styles.button].join(' ')}>
                Create New Subforum
            </button>
        </div>
      {showForm && (
        <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>SUBFORUM FORM</h1>
        <input
            type="Name"
            placeholder="Name"
            name="name"
            onChange={handleChangeName}
            value={nameform.name}
            required
            className={styles.input}
        />
        <input
            type="Description"
            placeholder="Description"
            name="description"
            onChange={handleChangeDesc}
            value={nameform.description}
            required
            className={styles.input}
        />
        <input
            type="Tags"
            placeholder="Tags"
            name="Tags"
            onChange={handleChangeList}
            required
            className={styles.input}

        />
        <input 
            type="BannedKeys"
            placeholder="Banned Keywords"
            name="bannedkeywords"
            onChange={handlechangeKeywords}
            required
            className={styles.input}
        />
        <button type="submit" className={styles.green_btn}>
            SUBMIT
        </button>
    </form>
      )}
      <h2>My Subgreddiits</h2>
      <ul>
        {subreddits.map(subreddit => (
          <li key={subreddit._id}>
            <a href={`/allsubgreddiit/${subreddit._id}`}>{subreddit.subredditName}</a>
            <button onClick={(event) => handleopen(subreddit._id)}>Open</button>
            <button onClick={() => handleDelete(subreddit._id)}>Delete</button>
          </li>
        ))}
      </ul>
    <div>

    </div>
    </div>
  );
}

export default Subgreddiit;
