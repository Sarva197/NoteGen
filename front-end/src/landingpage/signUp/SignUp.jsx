import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const { signup } = useAuth(); // ✅ Use signup from context
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const response = await signup(
      { username, email, password },
      { withCredentials: true }
    );

    if (response.success) {
      toast.success(`Welcome ${username}`, { autoClose: 3000 });
      navigate("/dashboard" , { replace: true });
    } else {
      toast.error(response.message || "Signup failed!", { autoClose: 3000 });
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <form
        className={`card p-4 shadow-lg needs-validation ${
          validated && "was-validated"
        }`}
        noValidate
        style={{
          maxWidth: "350px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto", //its is to ardjust the overflow in y axis
        }}
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
          <div className="invalid-feedback">Please enter your username.</div>
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
            minLength={6}
            required
          />
          <div className="invalid-feedback">Please enter a valid email.</div>
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
          <div className="invalid-feedback">
            Please enter your password (minimum 6 characters).
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Submit
          </button>
        </div>
         <div className="text-center">
          <a
            href="http://localhost:3000/auth/google"
            className="btn btn-danger w-100 mt-3"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-google me-2"></i>
            Sign in with Google
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
