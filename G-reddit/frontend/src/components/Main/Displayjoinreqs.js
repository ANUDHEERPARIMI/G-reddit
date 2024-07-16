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
const DisplayJoiningreqs = () => {
  const [postts, setposts] = useState([]);
  let url = "/api/subgreddit/"
  url = url.concat(useParams().id)
  let url1 = url.concat("/accept")
  let url2 = url.concat("/reject")
  //console.log(filteredSubreddits[0])
  useEffect(() => {
    const fetchPosts = async () => {
        console.log(url)
      const response = await axios.get(url);
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
  const handleaccept = (id,email) => {
        const data = {
            id: id,
            email: email
        }
        const response = axios.post(url1,data)
  }
  const handlereject = (id,email) => {
    const data = {
        id: id,
        email: email
    }
    const response = axios.post(url2,data)
}
let url3 = "/allsubgreddiit/"
  url3 = url3.concat(postts._id)
  url3 = url3.concat("/users")
  let url4 = "/allsubgreddiit/"
  url4 = url4.concat(postts._id)
  url4 = url4.concat("/reports")
  let url5 = "/allsubgreddiit/"
  url5 = url5.concat(postts._id)
  url5 = url5.concat("/joiningreqs")
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
      <h1>Joining Request</h1>
      <p>Subgreddiit Name: {postts.subredditName}</p>
       <ul>
        {(postts.admin === localStorage.getItem("token")) && postts.joiningreqs && postts.joiningreqs.map(post => (
          <li>
              <p>Name: {post}</p>
              <button onClick={(event) => handleaccept(postts._id,post)}>Accept</button>
              <button onClick={(event) => handlereject(postts._id,post)}>Reject</button>
              </li>
))}
    </ul> 
    </div>
  );
}; 
export default DisplayJoiningreqs;
