import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { state } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    await login(email, password);
  };

  console.log(error);

  function handleGuestUser() {
    setEmail("test@gmail.com");
    setPassword("Test123!");
  }

  useEffect(() => {
    if (state.user) {
      navigate("/invoicespage");
    }
  }, [state.user]);
  return (
    <form className="flex login" onSubmit={handleSubmit}>
      <button
        type="button"
        className="btn  btn-return"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <h3>Login</h3>

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
        Login
      </button>
      <p>Login with our credentials</p>
      <button
        disabled={isLoading}
        onClick={handleGuestUser}
        className="btn btn-login"
      >
        Guest
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
