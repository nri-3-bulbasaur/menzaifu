// React
import React from 'react';

// Amplify
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Components
import FoodTypesList from './components/FoodTypesList';
import UsersDemo from './components/UsersDemo';
import FoodTypesDemo from './components/FoodTypesDemo';
import ActivitiesDemo from './components/ActivitiesDemo';

Amplify.configure(awsExports);

// lint err function App(signOut, user) {
function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Authenticator>
            {({ signOut, user }) => (
              <main>
                <h1>Hello {user.username}</h1>
                <button onClick={signOut}>Sign out</button>
                <FoodTypesList />
                <UsersDemo />
                <FoodTypesDemo />
                <ActivitiesDemo />
              </main>
            )}
          </Authenticator>
        </header>
      </div>
    </>
  );
}

export default App;
