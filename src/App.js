// React
import React, { useState, useEffect } from "react";

// Amplify
import { Amplify } from "aws-amplify";
import { Authenticator, Button, Flex, Heading, Text, TextField, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";

// GraphQL Wrapper
import { fetchTodosUtil, createTodoUtil, deleteTodoUtil } from "./utils/fetchTodos";
import UsersDemo from "./components/UsersDemo";

Amplify.configure(awsExports);

function App(signOut, user) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchRes = await fetchTodosUtil();
      setTodos(fetchRes);
    })();
  }, []);

  const createTodo = async (userName, e) => {
    const newTodos = await createTodoUtil(userName, e);
    setTodos(newTodos);
  };

  const deleteTodo = async (todo) => {
    const newTodos = await deleteTodoUtil(todo.id, todos);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Authenticator>
            {({ signOut, user }) => (
              <main>
                <h1>Hello {user.username}</h1>
                <button onClick={signOut}>Sign out</button>
                <UsersDemo />
              </main>
            )}
          </Authenticator>
        </header>
      </div>
    </>
  );
}

export default App;
