import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState('');// states to manage form 
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();// to navigate to user page after login 
  

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log(e)
    
  //   const response = await login({ email, password });// making api call for login in backend 

  //   // check the response ;
  //   if(response.message){
  //     alert("Login successful!");
  //     navigate("/dashboard"); // Navigate after successful signup
  //   }else{
  //     alert(response.message || "Signup failed!");
  //   }
    
  // };

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <form
        className="card p-4 shadow-lg"
        style={{ maxWidth: '400px', width: '100%' , height: "50vh"}}
      >
        {/* Title */}
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button  className="btn btn-primary w-100 mt-3">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
