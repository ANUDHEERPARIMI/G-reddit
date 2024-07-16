// Main.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../Navbar';
import styles from './profile.css';

const Main = () => {
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users', { params: { email: localStorage.getItem('token') } });
        setUserDetails(response.data);
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleUnfollow = async (email) => {
    try {
      await axios.delete('/api/users/followers', { params: { email, email2: localStorage.getItem('token') } });
      // Refetch data or update state to reflect changes
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFollow = async (email) => {
    try {
      await axios.delete('/api/users/following', { params: { email, email2: localStorage.getItem('token') } });
      // Refetch data or update state to reflect changes
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
    
    {/* <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" rel="stylesheet" /> */}
    
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css' />
    
    {/* <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css' /> */}

    <Navbar />
    <div className={styles.main_container}>
      <div className="student-profile py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent text-center">
                  <img className="profile_img" src="https://source.unsplash.com/600x300/?student" alt="student dp" />
                </div>
                <div className="card-body">
                  <h3>{userDetails.firstName} {userDetails.lastName}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow-sm section">
                <div className="card-header bg-transparent border-0">
                  <h3 className="mb-0 " ><i className="far fa-clone pr-1"></i>General Information</h3>
                </div>
                <div className="card-body pt-0">
                  <table className="table table-bordered">
                    <tr>
                      <th width="30%">Email</th>
                      <td width="2%">:</td>
                      <td>{userDetails.email}</td>
                    </tr>
                    <tr>
                      <th width="30%">Username:</th>
                      <td width="2%">:</td>
                      <td>{userDetails.username}</td>
                    </tr>
                    
                    <tr>
                      <th width="30%">Following</th>
                      <td width="2%">:</td>
                      <td>{following.length}</td>
                    </tr>
                    <tr>
                      <th width="30%">Followers</th>
                      <td width="2%">:</td>
                      <td>{followers.length}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div style={{ height: '26px' }}></div>

              <div className="card shadow-sm section">
                <div className="card-header bg-transparent border-0">
                  <h3 className="mb-0"><i className="far fa-clone pr-1"></i>Following</h3>
                </div>
                <div className="card-body pt-0">
                  <div className="followingList">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {following.map((user) => (
                          <tr key={user}>
                            <td>{user}</td>
                            <td>
                              <button onClick={() => handleUnfollow(user)}>
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm section">
                <div className="card-header bg-transparent border-0">
                  <h3 className="mb-0"><i className="far fa-clone pr-1"></i>Followers</h3>
                </div>
                <div className="card-body pt-0">
                  <div className="followList">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {followers.map((user) => (
                          <tr key={user}>
                            <td>{user}</td>
                            <td>
                              <button onClick={() => handleRemoveFollow(user)}>
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
export default Main;