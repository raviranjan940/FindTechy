import React, { useState } from "react";
import {Loader} from './Loader/Loader'
import "./main.css";

function Main() {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //Taking username as input
    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    // Handling the submit after fetching username from input field
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}`
            );
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setError("");
            } else {
                setError("User not found!!");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data.");
        }
        setIsLoading(false);
    };

    return (
        <div className="main-container">
            {/* Username Search Section */}
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

            {/* Error Handeling If Username not exists */}
            {error && <p className="error">{error}</p>}

            {/* Enable Loader while fetching user profile details */}
            {isLoading && <Loader/> }
            {userData && !isLoading && (
                <div className="profile divide-x-4">

                    {/* Image and Name Container */}
                    <div className="img-container d-flex-col">
                        <img
                            src={userData.avatar_url}
                            alt="User Avatar"
                            className="avatar"
                        />
						<div className="name-btn">{userData.name}</div>
                    </div>

                    {/* Profile Details Container */}
                    <div className="profile-details">
                        <div className="flex justify-between">
                            <div className="info">
                                <label>Followers: </label>{userData.followers}
                            </div>
                            <div className="info">
                                <label>Following: </label> {userData.following}
                            </div>
                        </div>
                        <div className="info">
                            <label>Public Repositories: </label> {userData.public_repos}
                        </div>
                        <div className="info">
                            <label>Bio:</label> {userData.bio}
                        </div>
                        <div className="info">
                            <label>Location: </label>
                            {userData.location ? userData.location : "Not available"}
                        </div>
                        <div>
                            <div className="info">
                                <label>Member Since:{" "}</label>
                                {new Date(
                                    userData.created_at
                                ).toLocaleDateString()}
                            </div>
                        </div>
						<div className="flex justify-between">
							<div>
                                <label>Username: </label>
                                {userData.login}
                            </div>
						    <a 
								href={userData.blog}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="website-link">Website</div>
							</a>
						</div>
                        <a
							href={userData.html_url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="profile-btn">
							    View Profile on GitHub
						    </div>
						</a>
						
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;
