import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // ✅ Import useAuth

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth(); // ✅ Use signup from context
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await signup({ username, email, password });

    if (response.success) {
      alert("Signup successful!");
      navigate("/dashboard");
    } else {
      alert(response.message || "Signup failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <form
        className="card p-4 shadow-lg"
        style={{ maxWidth: "350px", width: "100%", height: "60vh" }}
        onSubmit={handleSignup} 
      >
        <h3 className="text-center mb-4">Sign Up</h3>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
