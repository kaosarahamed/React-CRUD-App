import axios from "axios";
import React, { useEffect, useState } from "react";
import EditUser from "./EditUser";
import UserForm from "./UserForm";
import Style from "./Users.module.css";
function Users() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShow, setisShow] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState("");
  const [deleteerror, setdeleterror] = useState("");
  const [addId, setAddId] = useState();
  const [editFormShow, seteditFormShow] = useState(false);
  const [filterFormat, setfilterFormat] = useState({});
  const [sorted, setsortedData] = useState({ sorted: "id", reverse: false });
  const [searchPhrase, setSearchPhrase] = useState("");

  const Reolader = async () => {
    await fetch("http://localhost:3001/user")
      .then((res) => {
        if (!res.ok) {
          throw Error("Your Api Connection Faild");
        }
        setisLoading(true);
        return res.json();
      })
      .then((data) => {
        setData(data);
        setisLoading(false);
      })
      .catch((err) => {
        setError(err);
        setisLoading(true);
      });
  };

  useEffect(() => {
    Reolader();
  }, []);

  const filterUsers = () => {
    const userCopy = [...data];
    userCopy.sort((a, b) => {
      const usernameA = `${a.username}`;
      const usernameB = `${b.username}`;
      if (sorted.reverse && filterFormat === "Descending") {
        return usernameA.localeCompare(usernameB);
      }
      if (filterFormat === "Ascending") {
        return usernameB.localeCompare(usernameA);
      }
      return usernameB.localeCompare(usernameA);
    });
    setData(userCopy);
    setsortedData({ sorted: "name", reverse: !sorted.reverse });
  };

  const handleCloseForm = () => {
    setisShow(true);
  };

  const editUser = (id) => {
    setAddId(id);
    seteditFormShow(!editFormShow);
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:3001/user/${id}`)
      .then((res) => {
        setdeleteMessage(res.data.message);
      })
      .catch((err) => {
        setdeleterror(err.response.data.message);
      });
    const filterData = data.filter((data) => data._id !== id);
    setData(filterData);
  };

  return (
    <div className={Style.UserPage}>
      {error && (
        <h2
          style={{ backgroundColor: data ? "#300048" : error ? "red" : null }}
        >
          {error}
        </h2>
      )}
      {deleteMessage && (
        <h2
          style={{
            backgroundColor: deleteMessage
              ? "#300048"
              : deleteerror
              ? "red"
              : null,
          }}
        >
          {deleteMessage ? deleteMessage : deleteerror}
        </h2>
      )}

      <div className={Style.headerArea}>
        <select
          className="form-select form-select-lg mb-3"
          onChange={(e) => {
            setfilterFormat(e.target.value);
            filterUsers();
          }}
          name="filterBy"
          id="filterBy"
          aria-label=".form-select-lg example"
        >
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
        <button onClick={handleCloseForm}>Click Here To Create New User</button>
        <input
          type="text"
          name="search"
          onChange={(e) => {
            setSearchPhrase(e.target.value);
          }}
          id="Search"
          placeholder="Search Your Data"
        />
      </div>
      <div className={Style.userItems}>
        {data &&
          data
            .filter((data) =>
              data.username.toLowerCase().includes(searchPhrase.toLowerCase())
                ? data
                : searchPhrase === ""
                ? data
                : null
            )
            .map((user, index) => {
              const { username, email, _id } = user;
              return (
                <section key={index} className={Style.userItem}>
                  <h2>{username}</h2>
                  <h3>{email}</h3>
                  <div className={Style.buttons}>
                    <button
                      onClick={() => {
                        editUser(_id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      id={_id}
                      onClick={() => {
                        deleteUser(_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </section>
              );
            })}
      </div>
      {isLoading && <h2>Loading...</h2>}
      {isShow && <UserForm Reolader={Reolader} setisShow={setisShow} />}
      <div>
        {editFormShow && (
          <EditUser
            addId={addId}
            Reolader={Reolader}
            seteditFormShow={seteditFormShow}
          />
        )}
      </div>
    </div>
  );
}

export default Users;
