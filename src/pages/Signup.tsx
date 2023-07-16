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
    <div className="flex container">
      <form className="flex signup" onSubmit={handleSubmit}>
        <button
          type="button"
          className="btn flex btn-return"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <h3>Sign up</h3>
        <h4>Rules for creating credentials</h4>
        <ol className="rules">
          <li className="rule-item">
            The email doesn't have to be your real one , any unique one will do.
            Even this one can do{" "}
            <span className="rule-email">fakeem@gmail.com</span>
          </li>
          <li className="rule-item">
            If the email exists in our storage, it will be rejected
          </li>
          <li className="rule-item">
            Password should contain at least a Capital letter, small letter ,
            number and any speacial character
          </li>
        </ol>
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
    </div>
  );
}

export default Signup;
