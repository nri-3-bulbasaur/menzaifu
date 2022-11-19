// React
import React, { useState, useEffect } from "react";
import "./App.css";
// Amplify
import { Amplify, API } from "aws-amplify";
import { Authenticator, Button, Flex, Heading, Text, TextField, View, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
// AppSync
import { listTodos } from "./graphql/queries";
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from "./graphql/mutations";
// https://eslint.org/docs/latest/rules/no-restricted-globals
// import event from "event-module";

Amplify.configure(awsExports);

function App(signOut, user) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  /**
   * APIクラスを使用し、GraphQL API にクエリを送信
   */
  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    setTodos(notesFromAPI);
  }

  async function createTodos(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    await API.graphql({
      query: createTodoMutation,
      variables: { input: data },
    });
    fetchTodos();
    event.target.reset();
  }

  async function deleteTodo({ id }) {
    const newNotes = todos.filter((note) => note.id !== id);
    setTodos(newNotes);
    await API.graphql({
      query: deleteTodoMutation,
      variables: { input: { id } },
    });
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Authenticator>
            {({ signOut, user }) => (
              <main>
                <h1>Hello {user.username}</h1>
                <button onClick={signOut}>Sign out</button>
                <Heading level={1}>My Notes App</Heading>
                <View
                  as="form"
                  margin="3rem 0"
                  onSubmit={(e) => {
                    createTodos(e);
                  }}
                >
                  <Flex direction="row" justifyContent="center">
                    <TextField
                      name="name"
                      placeholder="Note Name"
                      label="Note Name"
                      labelHidden
                      variation="quiet"
                      required
                    />
                    <TextField
                      name="description"
                      placeholder="Note Description"
                      label="Note Description"
                      labelHidden
                      variation="quiet"
                      required
                    />
                    <Button type="submit" variation="primary">
                      Create Note
                    </Button>
                  </Flex>
                </View>
                <Heading level={2}>Current Notes</Heading>
                <View margin="3rem 0">
                  {todos.map((note) => (
                    <Flex key={note.id || note.name} direction="row" justifyContent="center" alignItems="center">
                      <Text as="strong" fontWeight={700}>
                        {note.name}
                      </Text>
                      <Text as="span">{note.description}</Text>
                      <Button variation="link" onClick={() => deleteTodo(note)}>
                        Delete note
                      </Button>
                    </Flex>
                  ))}
                </View>
              </main>
            )}
          </Authenticator>
        </header>
      </div>
    </>
  );
}

export default App;
