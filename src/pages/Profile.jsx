import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/user", { credentials: "include" })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then(data => setUser(data.user || data))
      .catch(err => console.error("Error fetching user:", err));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.displayName}</p>
      {user.email && <p>Email: {user.email}</p>}
      {user.photos && user.photos.length > 0 && (
        <img src={user.photos[0].value} alt="Profile" width="100" />
      )}
      <a href="http://localhost:5000/logout">Logout</a>
    </div>
  );
};

export default Profile;