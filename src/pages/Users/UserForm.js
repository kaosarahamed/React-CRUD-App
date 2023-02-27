import axios from "axios";
import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import Style from "./Users.module.css";
function UserForm(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [createdata, setcreateData] = useState("");
  const [error, setError] = useState("");
  const { username, email } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://node-app-0cjt.onrender.com/user", user)
      .then((res) => {
        setcreateData(res.data.message);
        props.Reolader();
      })
      .catch((err) => setError(err.response.data.message));

    setUser({ username: "", email: "" });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const closeForm = () => {
    props.setisShow(false);
  };
  return (
    <div className={Style.createForm}>
      <div className={Style.createFormContainer}>
        <RiCloseCircleLine onClick={closeForm} />
        <p
          style={{
            backgroundColor: createdata ? "#300048" : error ? "red" : null,
          }}
        >
          {createdata ? createdata : error}
        </p>
        <h2 className={Style.title}>Create User</h2>
        <form onSubmit={handleSubmit} className={Style.userForm}>
          <span>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              name="username"
              required
              id="username"
              onChange={handleChange}
              placeholder="Enter your user name"
            />
          </span>
          <span>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              name="email"
              required
              id="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </span>
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
