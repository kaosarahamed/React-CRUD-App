import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import Style from "./Users.module.css";
function EditUser(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const id = props.addId;
  const [error, setError] = useState("");
  const [edit, setEdit] = useState("");
  const [editError, seteditError] = useState("");
  const { username, email } = user;
  const editFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:3001/user/${id}`, user)
      .then((res) => {
        setEdit(res.data.message);
        props.Reolader();
      })
      .catch((err) => {
        seteditError(err.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [id]);

  const closeForm = () => {
    props.seteditFormShow(false);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className={Style.editForm}>
      <div className={Style.createFormContainer}>
        <RiCloseCircleLine onClick={closeForm} />
        <p
          style={{
            backgroundColor: edit
              ? "#300048"
              : editError
              ? "red"
              : error
              ? "red"
              : null,
          }}
        >
          {edit ? edit : editError}
        </p>
        <h2 className={Style.title}>Edit User</h2>
        <form onSubmit={editFormSubmit} className={Style.userForm}>
          <span>
            <label htmlFor="username">Username</label>
            <input
              value={username}
              type="text"
              name="username"
              required
              id="username"
              onChange={(e) => {
                onValueChange(e);
              }}
              placeholder="Enter your user name"
            />
          </span>
          <span>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              name="email"
              required
              id="email"
              onChange={(e) => {
                onValueChange(e);
              }}
              placeholder="Enter your email"
            />
          </span>
          <button type="submit">Edit User</button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
