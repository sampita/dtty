import React from 'react'

const Home = ({ clearUser, ...props }) => (
  <div className="col-md-6">
    <h1>Welcome to dtty!</h1>
    <h3>It's going to be a bumpy ride...</h3>
    <button onClick={clearUser}>Log Out</button>
  </div>
)

export default Home
