import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import styles from './Allsubreddit.css';

const SubredditsList = () => {
  // State variables
  const [subreddits, setSubreddits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState('none');

  // Fetch subreddits on component mount
  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get("/api/subgreddit");
        setSubreddits(response.data);
      } catch (error) {
        console.error('Error fetching subreddits:', error);
      }
    };

    fetchSubreddits();
  }, []);

  // Filtering logic
  let filteredSubreddits = subreddits.filter(subreddit => subreddit.subredditName.toLowerCase().includes(searchQuery.toLowerCase()));
  if (tagFilter) {
    filteredSubreddits = filteredSubreddits.filter(subreddit => subreddit.tags.includes(tagFilter));
  }

  // Sorting logic
  const sortSubreddits = () => {
    switch (sortBy) {
      case 'name':
        return filteredSubreddits.sort((a, b) => a.subredditName.localeCompare(b.subredditName));
      case 'followers':
        return filteredSubreddits.sort((a, b) => b.members.length - a.members.length);
      case 'created_at':
        return filteredSubreddits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        // 'none' or invalid sortBy value
        return filteredSubreddits;
    }
  };

  const sortedSubreddits = sortSubreddits();

  // Event handlers
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleJoin = async (id) => {
    try {
      const data = {
        id: id,
        email: localStorage.getItem("token")
      }
      const response = await axios.post("/api/subgreddit/join", { params: data });
      if (response.data.makealert) {
        alert("You have left this subforum once. You can't join again");
      }
    } catch (error) {
      console.error('Error joining subforum:', error);
    }
  };

  const handleLeave = async (id) => {
    try {
      const data = {
        id: id,
        email: localStorage.getItem("token")
      }
      await axios.post("/api/subgreddit/leave", { params: data });
    } catch (error) {
      console.error('Error leaving subforum:', error);
    }
  };

  // JSX content
  return (
    <div className="">
      {/* Header and Navigation */}
    {/* <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" rel="stylesheet" /> */}
    {/* Bootstrap CSS */}
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css' />
    {/* Font Awesome CSS */}
    {/* <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css' /> */}
    
      <Navbar />
      

      <div className='subgreddit'>
      <h1 className='heading'>SUBFORUM</h1>
 

    

      {/* Subreddit Search Input */}
      <div className="d-flex justify-content-center h-75">
      {/* Search Subreddits */}
      <div className="searchbarcontainer searchbar" style={{width: "40%"}}>
        <input
          className="search_input"
          type="text"
          placeholder="Search Subreddits"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <a href="#" className="search_icon">
          <i className="fas fa-search"></i>
        </a>
      </div>

      {/* Search Tags */}
      <div className="searchbarcontainer searchbar" style={{width: "40%"}}>
        <input
          className="search_input"
          type="text"
          placeholder="Search Tags"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />
        <a href="#" className="search_icon">
          <i className="fas fa-search"></i>
        </a>
      </div>
    </div>
    </div>
  



      {/* Subreddits List */}
      <div className='t'>
      
      <div className="container">
      
      <ul className={`responsive-table ${styles.subredditsList}`}>
        <li className="table-header">
          <div className={`col col-1 ${styles.tableHeader}`}>Subforum Name</div>
          <div className={`col col-2 ${styles.tableHeader}`}>Tags</div>
          <div className={`col col-3 ${styles.tableHeader}`}>Actions</div>
        </li>
        {sortedSubreddits.map(subreddit => (
          <li key={subreddit._id} className="table-row" >
            <div className={`col col-1 ${styles.subredditName}`}>
              <a href={`/allsubgreddiit/${subreddit._id}`}>{subreddit.subredditName}</a>
            </div>
            <div className={`col col-2 ${styles.tagContainer}`}>
              {subreddit.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={`col col-3 ${styles.actions}`}>
              {!(subreddit.admin === localStorage.getItem("token")) && !(subreddit.members.includes(localStorage.getItem("token"))) && (
                <button onClick={() => handleJoin(subreddit._id)}>Join</button>
              )}
              {(subreddit.members.includes(localStorage.getItem("token"))) && !(subreddit.admin === localStorage.getItem("token")) && (
                <button onClick={() => handleLeave(subreddit._id)}>Leave</button>
              )}
              {(subreddit.admin === localStorage.getItem("token")) && (
                <button>Leave</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
   
    </div>
  );
};

export default SubredditsList;
