// React
import React from "react";

// Amplify
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";

// Components
import UsersDemo from "./components/UsersDemo";
import FoodTypesDemo from "./components/FoodTypesDemo";

Amplify.configure(awsExports);

function App(signOut, user) {
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
                <FoodTypesDemo />
              </main>
            )}
          </Authenticator>
        </header>
      </div>
    </>
  );
}

export default App;