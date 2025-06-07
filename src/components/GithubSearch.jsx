// import React, { useState } from 'react';
// import axios from 'axios';
// import './GithubSearch.css';
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import { PiBuildingsFill } from 'react-icons/pi';
// import { FaXTwitter } from 'react-icons/fa6';
// import { FaGithub } from 'react-icons/fa';
// // import { jsx } from 'react/jsx-runtime';

// const GithubSearch = () => {

//     const [username, setUsername] =useState('');
//     const [profile, setProfile] =useState('null');
//     const [error, setError] = useState(null);

//     const handleSubmit =async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.get(`https://api.github.com/users/${username}`);
//             setProfile(response.data);
//           } catch (error) {
//             console.error(error);
//             setError('User not found'); // optional user-friendly message
//           }
          
//     };
//   return (
//     <div className='main-container'>
//         <h1 className="main-heading">GitHub Profile Detective</h1>
//         <form onSubmit={handleSubmit} className='search-form'>
//           <input type="text" placeholder='Enter Github Username.....' value={username} className='search-input' onChange={(e) => setUsername(e.target.value)}/>
//           <button type='submit' className='search-btn'>Search</button>
//         </form>

//         {error && <p className='error-msg'>{error}</p>}
//         {profile && (
//             <div className="profile-container">
//                 <div className="profile-content">
//                     <div className="profile-img">
//                         <img src={profile.avatar_url} alt="Avatar" className='profile-avatar' />
//                     </div>
//                     <div className="profile-details">
//                         <div className="profile-des">
//                             <h2 className="profile-name">{profile.name}</h2>
//                             <p className='profile-created'>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
//                         </div>
//                         <a href={profile.html_url} target='_blank' rel='noreferrer' className='profile-username'>@{profile.login}</a>
//                         <p className="profile-bio">{profile.bio}</p>

//                         <div className="profile-stats">
//                             <p className="profile-repos">Repositories<br/><span className='states'>{profile.public_repos}</span></p>
//                             <p className="profile-followers">Followers<br/><span className='states'>{profile.followers}</span></p>
//                             <p className="profile-following">Following<br/><span className='states'>{profile.following}</span></p>
//                         </div>

//                         <div className="profile-info">
//                             <p className="profile-location"><FaMapMarkerAlt />{profile.location}</p>
//                             <p className="profile-company">< PiBuildingsFill />{profile.company}</p>
//                         </div>

//                         <div className="profile-links">
//                             <a href={`https://twitter.com/${profile.twitter_username}`} target='_blank' rel='noreferrer' className='twitter-link'><FaXTwitter />{profile.twitter_username}</a>
//                             <a href={profile.html_url} target='_blank' rel='noreferrer' className='profile-url'><FaGithub />View profile</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )}
//     </div>
//   )
// }

// export default GithubSearch




import React, { useState } from 'react';
import axios from 'axios';
import './GithubSearch.css';
import { FaMapMarkerAlt, FaTwitter, FaGithub } from 'react-icons/fa';
import { PiBuildingsFill } from 'react-icons/pi';

const GithubSearch = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setProfile(null);
    if (!username.trim()) return;
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfile(response.data);
    } catch (error) {
      setError('User not found');
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">GitHub Search</h1>
      <form onSubmit={handleSubmit} className="search-form" aria-label="GitHub username search form">
        <input
          type="text"
          placeholder="Enter GitHub Username..."
          value={username}
          className="search-input"
          onChange={(e) => setUsername(e.target.value)}
          aria-label="GitHub username"
        />
        <button type="submit" className="search-btn" disabled={!username.trim()}>
          Search
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {profile && (
        <div className="profile-container" role="region" aria-live="polite">
          <div className="profile-content">
            <div className="profile-img">
              <img src={profile.avatar_url} alt={`${profile.name || profile.login} avatar`} className="profile-avatar" />
            </div>
            <div className="profile-details">
              <div className="profile-header">
                <h2 className="profile-name">{profile.name || 'Name not available'}</h2>
                <p className="profile-join-date">Joined {new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="profile-username">
                @{profile.login}
              </a>
              <p className="profile-bio">{profile.bio || 'No bio available.'}</p>

              <div className="profile-stats">
                <div className="stat-box">
                  <p className="stat-label">Repositories</p>
                  <p className="stat-number">{profile.public_repos}</p>
                </div>
                <div className="stat-box">
                  <p className="stat-label">Followers</p>
                  <p className="stat-number">{profile.followers}</p>
                </div>
                <div className="stat-box">
                  <p className="stat-label">Following</p>
                  <p className="stat-number">{profile.following}</p>
                </div>
              </div>

              <div className="profile-info">
                <p className="info-item">
                  <FaMapMarkerAlt className="info-icon" /> {profile.location || 'Not specified'}
                </p>
                <p className="info-item">
                  <PiBuildingsFill className="info-icon" /> {profile.company || 'Not specified'}
                </p>
              </div>

              <div className="profile-links">
                {profile.twitter_username ? (
                  <a
                    href={`https://twitter.com/${profile.twitter_username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="twitter-link"
                  >
                    <FaTwitter /> @{profile.twitter_username}
                  </a>
                ) : (
                  <p className="twitter-link disabled">No Twitter</p>
                )}
                <a href={profile.html_url} target="_blank" rel="noreferrer" className="github-link">
                  <FaGithub /> View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubSearch;
