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
const DisplayUsers = () => {
  const [postts, setposts] = useState([]);
  let url = "/api/subgreddit/"
  url = url.concat(useParams().id)
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
  let url3 = "/allsubgreddiit/"
  url3 = url3.concat(postts._id)
  url3 = url3.concat("/users")
  let url4 = "/allsubgreddiit/"
  url4 = url4.concat(postts._id)
  url4 = url4.concat("/reports")
  let url5 = "/allsubgreddiit/"
  url5 = url5.concat(postts._id)
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
      <h1>Users</h1>
      <p>Subforum Name: {postts.subredditName}</p>
       <ul>
        {postts.members && postts.members.map(post => (
          <li>
              <p>Name: {post}</p>
              </li>
))}
    </ul> 
    </div>
  );
}; 
export default DisplayUsers;
