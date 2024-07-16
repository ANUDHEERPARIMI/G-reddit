import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from '../Navbar/NavbarElements';
const DisplayReports = () => {
  const [postts, setposts] = useState([]);
  const [ignore,setignore] = useState(false)
  const c = useParams().id
  const url = {
    id: c
  }
  const handledeletepost = async(id) => {
    console.log("post", id)
    const data = {
        id: id,
    }
    console.log(data)
    const res = axios.delete("/api/reportedpost", {params: data})
  }
  useEffect(() => {
    const fetchPosts = async () => {
        console.log(url)
      const response = await axios.get("/api/reportedpost", {params: url});
      //console.log(response.data)
      // const filtered = []
      // let i =0
      // for(i = 0;i<response.data.length;i++)
      // {
      //   if((response.data)[i].user === localStorage.getItem("token"))
      //   {
      //     filtered.push((response.data)[i])
      //   }
      // }
      console.log("res",response.data)
      //console.log(filtered)
      setposts(response.data);
    };

    fetchPosts();
  }, []);
  let url3 = "/allsubgreddiit/"
  url3 = url3.concat(useParams().id)
  url3 = url3.concat("/users")
  let url4 = "/allsubgreddiit/"
  url4 = url4.concat(useParams().id)
  url4 = url4.concat("/reports")
  let url5 = "/allsubgreddiit/"
  url5 = url5.concat(useParams().id)
  url5 = url5.concat("/joiningreqs")
  //console.log(filteredSubreddits[0])
  return (
    <div>
        <Navbar />
        <div style={{borderTop:"1px solid black"}}>
      <Nav style={{paddingLeft:"438px"}}>
        <Bars />
        <NavMenu>
        <NavLink to={url3} activeStyle>
            Users
          </NavLink>
          <NavLink to={url5} activeStyle>
            Joining Requests
          </NavLink>
          <NavLink to={url4} activeStyle>
            Reports
          </NavLink>
          <NavLink to={url3} activeStyle>
            Stats
          </NavLink>
        </NavMenu>
      </Nav>
      </div>
      <h1>Reported Posts</h1>
       <ul>
        {postts && postts.map(post => (
          <li>
              <p>Post author: {post.author}</p>
              <p>Reported By: {post.reporter}</p>
              <p>Concern: {post.concern}</p>
              <p>Text of the reported post: {post.text}</p>
              {!(ignore) && (
                <div>
                <button>Block User</button>
                <button onClick={(event) => handledeletepost(post.post)}>Delete Post</button>
                <button onClick={(event) => setignore(true)}>Ignore</button>
                </div>
              )
              }
              {ignore && (
                <button onClick={(event) => setignore(false)}>Unignore</button>
              )}
              </li>
))}
    </ul> 
    </div>
  );
}; 
export default DisplayReports;
