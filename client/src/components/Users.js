import React from "react";
import axios from "../utils/axios";
import { Button, Table, Spinner } from "reactstrap";
import "./Users.scss";

function Users(props) {
  const { history, users, getUsers } = props;

  const deleteUser = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then(() => {
        getUsers();
      })
      .catch((err) => console.dir(err));
  };

  if (!users.length) return <Spinner color="primary" />;

  return (
    <div className="users-list">
      <header>
        <Button color="primary" onClick={() => history.push("/users/add")}>
          Add User
        </Button>
        <h2>Users</h2>
      </header>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              className="user"
              key={user.id}
              onClick={() => history.push(`/users/${user.id}`)}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <Button
                  size="sm"
                  color="danger"
                  onClick={(e) => deleteUser(user.id)}
                >
                  delete
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => history.push(`/users/${user.id}/edit`)}
                >
                  edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
