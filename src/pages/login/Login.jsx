import { useState } from "react";
import { RequestLogin } from "../../config/newReguest";
import { Navigate, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLoggedIn } from "../../config/Hooks";
import { toast } from "react-toastify";
import "./login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useLoggedIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "") {
      toast.error("Istifadəçi adı daxil edin!");
    } else if (password == "") {
      toast.error("Parolu daxil edin!");
      toast.error;
    } else {
      RequestLogin({ email, password })
        .then((res) => {
          localStorage.setItem("currentUser", JSON.stringify(res)),
            navigate("/");
        })
        .catch((err) => {
          toast.error("Istifadəçi tapılmadı!");
        });
    }
  };

  if (isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Ofa MMC</h1>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="">Parol</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">daxil ol</button>
        </form>
      </div>
    );
  }
}

export default Login;
