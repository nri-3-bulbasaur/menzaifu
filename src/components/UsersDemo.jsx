import { View, Flex, TextField, Button, Table, TableHead, TableRow, TableBody, TableCell } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { listUsersUtil, createUsersUtil, updateUsersUtil, deleteUsersUtil } from "../utils/requestUsers";

const UsersDemo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const usersList = await listUsersUtil();
      setUsers(usersList);
    })();
  }, []);

  const createUser = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      userId: form.get("userId"),
      height: form.get("height"),
      weight: form.get("weight"),
      age: form.get("age"),
      zaifuPoint: form.get("zaifuPoint"),
    };
    const newUsers = await createUsersUtil(data);
    setUsers(newUsers);
  };

  const updateUser = async (user) => {
    const newUsers = await updateUsersUtil(user);
    setUsers(newUsers);
  };

  const deleteUser = async (user) => {
    const newUsers = await deleteUsersUtil(user.id);
    setUsers(newUsers);
  };

  return (
    <>
      <h1>Users Demo</h1>
      <div>
        <h2>Create User</h2>
        <View
          as="form"
          onSubmit={(e) => {
            createUser(e);
          }}
        >
          <Flex direction="column" alignItems="left">
            <TextField name="userId" placeholder="XXXXX" label="userId" variation="default" required />
            <TextField name="height" placeholder="170" label="height" variation="default" required />
            <TextField name="weight" placeholder="58.5" label="weight" variation="default" required />
            <TextField name="age" placeholder="32" label="age" variation="default" required />
            <TextField name="zaifuPoint" placeholder="120" label="zaifuPoint" variation="default" required />
          </Flex>
          <br />
          <Button type="submit" variation="primary">
            Create User
          </Button>
        </View>
      </div>
      <div>
        <h2>Delete User</h2>
        <Table caption="" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">userId</TableCell>
              <TableCell as="th">height</TableCell>
              <TableCell as="th">weight</TableCell>
              <TableCell as="th">age</TableCell>
              <TableCell as="th">zaifuPoint</TableCell>
              <TableCell as="th">createdAt</TableCell>
              <TableCell as="th">updatedAt</TableCell>
              <TableCell as="th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell key={user.userId + "userId"}>{user.userId}</TableCell>
                <TableCell key={user.height + "height"}>{user.height}</TableCell>
                <TableCell key={user.weight + "weight"}>{user.weight}</TableCell>
                <TableCell key={user.age + "age"}>{user.age}</TableCell>
                <TableCell key={user.zaifuPoint + "zaifuPoint"}>{user.zaifuPoint}</TableCell>
                <TableCell key={user.createdAt + "createdAt"}>{user.createdAt}</TableCell>
                <TableCell key={user.updatedAt + "updatedAt"}>{user.updatedAt}</TableCell>
                <TableCell key={user.id + "delete"}>
                  <Button key={user.id + "deleteButton"} onClick={() => deleteUser(user)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2>Update User</h2>
        <Table caption="" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">userId</TableCell>
              <TableCell as="th">height</TableCell>
              <TableCell as="th">weight</TableCell>
              <TableCell as="th">age</TableCell>
              <TableCell as="th">zaifuPoint</TableCell>
              <TableCell as="th">createdAt</TableCell>
              <TableCell as="th">updatedAt</TableCell>
              <TableCell as="th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id + "update"}>
                <TableCell key={user.userId + "userIdUpdate"}>{user.userId}</TableCell>
                <TableCell key={user.height + "heightUpdate"}>{user.height}</TableCell>
                <TableCell key={user.weight + "weightUpdate"}>{user.weight}</TableCell>
                <TableCell key={user.age + "ageUpdate"}>{user.age}</TableCell>
                <TableCell key={user.zaifuPoint + "zaifuPointUpdate"}>{user.zaifuPoint}</TableCell>
                <TableCell key={user.createdAt + "createdAtUpdate"}>{user.createdAt}</TableCell>
                <TableCell key={user.updatedAt + "updatedAtUpdate"}>{user.updatedAt}</TableCell>
                <TableCell key={user.id + "update"}>
                  <Button key={user.id + "updateButton"} onClick={() => updateUser(user)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UsersDemo;
