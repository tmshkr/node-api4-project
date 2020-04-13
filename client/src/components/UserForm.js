import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label } from "reactstrap";
import "./UserForm.scss";
import axios from "../utils/axios";

function UserForm(props) {
  const { history, match, users, getUsers } = props;
  const { handleSubmit, register, errors, setError, setValue } = useForm();

  const { id } = match.params;

  useEffect(() => {
    if (id) {
      const user = users.find((u) => u.id === Number(id));
      if (!user) history.push("/users");
      const values = [];
      for (let field in user) {
        values.push({ [field]: user[field] });
      }
      setValue(values);
    }
    // eslint-disable-next-line
  }, [id]);

  const addUser = (values) => {
    axios
      .post("/api/users", values)
      .then(({ data }) => {
        getUsers().then(() => {
          history.push("/users");
        });
      })
      .catch((err) => console.dir(err));
  };

  const editUser = (values, id) => {
    axios
      .put(`/api/users/${id}`, values)
      .then(({ data }) => {
        getUsers().then(() => {
          history.push("/users");
        });
      })
      .catch((err) => console.dir(err));
  };

  const onSubmit = (values) => {
    id ? editUser(values, id) : addUser(values);
  };

  return (
    <form className="form user-form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="name">Name</Label>
        <input
          className="form-control"
          name="name"
          type="text"
          id="name"
          ref={register({
            required: "Required",
          })}
        />
        <span className="error">{errors.name && errors.name.message}</span>
      </FormGroup>
      <Button type="submit" color="primary" size="lg" block>
        {id ? "Edit User" : "Create User"}
      </Button>
      <span className="error">
        {errors.response && errors.response.message}
      </span>
    </form>
  );
}

export default UserForm;
