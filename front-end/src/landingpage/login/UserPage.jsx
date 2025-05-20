import React from "react";

const UserPage = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate web developer and tech enthusiast.",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
      <div className="w-80 h-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col items-center p-6">
          <div className="w-32 h-32 rounded-full border-4 border-purple-500 overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1731328667980-9ea08c5edc07?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User Avatar"
              className="w-full h-full object-cover"
              style={{
                width: "10rem",
                height: "10rem",
                marginRight: "20rem",
                borderRadius: "50%",
              }}
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-sm text-gray-700 text-center">{user.bio}</p>
          <p className="mt-2 text-sm text-gray-500">{user.location}</p>
          <a
            href={user.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            {user.website}
          </a>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-4">
            <button className="w-full px-4 py-2 text-sm font-semibold text-black bg-purple-500 rounded-lg hover:bg-purple-600 g-4">
              Change Password
            </button>
            <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600">
              Update Phone Number
            </button>
            <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600">
              Edit Profile
            </button>
            <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
