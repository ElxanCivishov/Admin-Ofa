import { useState } from "react";
// import upload from "../../utils/upload";
import "./Register.scss";
// import newRequest from "../../config/newReguest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const url = await upload(file);
    try {
      // await newRequest.post("/auth/register", {
      //   ...user,
      //   // img: url,
      // });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Yeni hesab Yarat</h1>
          <label htmlFor="">Istifadəçi adı</label>
          <input name="username" type="text" onChange={handleChange} />
          <label htmlFor="">Email</label>
          <input name="email" type="email" onChange={handleChange} />
          <label htmlFor="">Parol</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profil şəkili</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Yarat</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
