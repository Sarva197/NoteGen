import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false); // For Bootstrap validation

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await login({ email, password });

      if (response.success) {
        toast.success("Login successful!", { autoClose: 3000 });
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Login failed!", { autoClose: 3000 });
      }
    } catch (error) {
      // Check if it's an Axios error with a response
      if (error.response) {
        if (error.response.status === 429) {
          toast.error("Too many login attempts. Please try again later.", {
            autoClose: 3000,
          });
          return;
        } else {
          toast.error(error.response.data || "Login failed!", {
            autoClose: 3000,
          });
          return;
        }
      }

      // For any other errors (like network issues)
      toast.error("Something went wrong. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <form
        className={`card p-4 shadow-lg needs-validation ${
          validated ? "was-validated" : ""
        }`}
        noValidate
        onSubmit={handleLogin}
        style={{
          maxWidth: "400px",
          width: "100%",
          minHeight: "350px",
        }}
      >
        <h3 className="text-center mb-4">Login</h3>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <div className="invalid-feedback">
            Please enter your password (minimum 6 characters).
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 mt-3">
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

export default Login;
