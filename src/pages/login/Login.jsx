import { useState } from "react";
import "./login.scss";
import newRequest from "../../config/newReguest";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoggedIn } from "../../config/Hooks";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const isLoggedIn = useLoggedIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username == "") {
      setError("Istifadəçi adı daxil edin!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (password == "") {
      setError("Parolu daxil edin!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        const res = await newRequest.post("/login", {
          email: username,
          password,
        });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        Navigate("/");
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Daxil ol</h1>
          <label htmlFor="username">Istifadəçi adı</label>
          <input
            name="username"
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="">Parol</label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">daxil ol</button>
          {error && <span>{error}</span>}
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default Login;
