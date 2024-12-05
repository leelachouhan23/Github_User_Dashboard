import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    if (!username) {
      alert('Please enter a GitHub username!');
      return;
    }

    try {
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      setProfile(userRes.data);

      const reposRes = await axios.get(userRes.data.repos_url);
      setRepos(reposRes.data);

      const followersRes = await axios.get(userRes.data.followers_url);
      setFollowers(followersRes.data);

      setError('');
    } catch (err) {
      setError('User not found or an error occurred');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Profile Fetcher</h1>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchProfile}>Fetch Profile</button>
      </header>
      {error && <div className="error">{error}</div>}
      {profile && (
        <div className="profile">
          <img src={profile.avatar_url} alt="Profile Avatar" />
          <h2>{profile.name}</h2>
          <p>{profile.bio}</p>
          <p>{profile.location}</p>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
            View Profile on GitHub
          </a>
        </div>
      )}
      <div className="repos">
        <h3>Repositories:</h3>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="followers">
        <h3>Followers:</h3>
        <ul>
          {followers.map((follower) => (
            <li key={follower.id}>
              <a href={follower.html_url} target="_blank" rel="noopener noreferrer">
                {follower.login}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;



