import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    console.log(email, password);
    await signup(email, password);
  };
  return (
    <form className="flex signup" onSubmit={handleSubmit}>
      <button
        type="button"
        className="btn flex btn-return"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <h3>Sign up</h3>
      <div className="flex login-container">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          className="input-login"
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div className="flex login-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          className="input-login"
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <button disabled={isLoading} className="btn btn-login">
        Sign up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Signup;
