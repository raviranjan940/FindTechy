import React, { useState } from "react";
import "./main.css";

function Main() {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}`
            );
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setError("");
            } else {
                setError("User not found!");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data.");
        }
    };

    return (
        <div className="main-container">
            <div className="mt-10 text-xl font-medium">
                FindTechy : GitHub Profile Viewer
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter GitHub Username"
                    value={username}
                    onChange={handleChange}
                    className="custom-input"
                />
                <button type="submit" className="search-btn">
                    Search Profile
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {userData && (
                <div className="profile divide-x-4">
                    <div className="img-container d-flex-col">
                        <img
                            src={userData.avatar_url}
                            alt="User Avatar"
                            className="avatar"
                        />
						<div>{userData.name}</div>
                    </div>
                    <div className="profile-details">
                        <div className="follow-container">
                            <div className="info">
                                Followers: {userData.followers}
                            </div>
                            <div className="info">
                                Following: {userData.following}
                            </div>
                        </div>
                        <div className="info">
                            Public Repositories: {userData.public_repos}
                        </div>
                        <div className="info">Bio: {userData.bio}</div>
                        <div className="info">Location: {userData.location}</div>
                        <div>
                            <div className="info">
                                Member Since:{" "}
                                {new Date(
                                    userData.created_at
                                ).toLocaleDateString()}
                            </div>
                        </div>
						<div className="flex gap-6">
							<div>Username: {userData.login}</div>
						    <a 
								href={userData.blog}
								target="_blank"
								rel="noopener noreferrer"
								className="website-link"
							>
								Website
							</a>
						</div>
						<div>
							<a
								href={userData.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="profile-link"
							>
								View Profile on GitHub
							</a>
						</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;
