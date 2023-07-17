import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
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
          Return to Landing page
        </button>
        <h3>Sign up</h3>
        <Tooltip anchorSelect="#tooltip" place="bottom-end">
          <ol className="rules">
            <li className="rule-item">
              The email doesn't have to be your real one
            </li>
            <li className="rule-item">Email must be unique</li>
            <li className="rule-item">
              Password should contain at least:
              <ul>
                <li className="pass-rule-item">Capital letter</li>
                <li className="pass-rule-item">Small letter</li>
                <li className="pass-rule-item">Number</li>
                <li className="pass-rule-item">Special character</li>
              </ul>
            </li>
          </ol>
        </Tooltip>
        <a href="#" className="tooltip" data-tooltip-id="tooltip">
          Rules for creating credentials
        </a>
        <div className="flex login-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            className="input-login"
            aria-describedby="error"
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className="flex login-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            className="input-login"
            aria-describedby="error"
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <button disabled={isLoading} className="btn btn-login">
          Sign up
        </button>
        {error && (
          <div id="error" className="error">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default Signup;
