// React
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Amplify
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { Button } from '@aws-amplify/ui-react';

// Components
import UsersDemo from './components/UsersDemo';
import FoodTypesDemo from './components/FoodTypesDemo';
import ActivitiesDemo from './components/ActivitiesDemo';
import IconsDemo from './components/IconsDemo';

Amplify.configure(awsExports);

function App() {
  return (
    <>
      <header className="App-header">
        <Authenticator socialProviders={['google']}>
          {({ signOut, user }) => (
            <main>
              <span>Hello {user.username}</span>
              <button onClick={signOut}>Sign out</button>
              <Link to="/users">
                <Button variation="primary">Users</Button>
              </Link>
              <Link to="/activities">
                <Button variation="primary">Activities</Button>
              </Link>
              <Link to="/foodtypes">
                <Button variation="primary">FoodTypes</Button>
              </Link>
              <Link to="/icons">
                <Button variation="primary">Icons</Button>
              </Link>
            </main>
          )}
        </Authenticator>
      </header>
      <Routes>
        <Route path={`/`} element={<UsersDemo />} />
        <Route path={`/users`} element={<UsersDemo />} />
        <Route path={`/activities`} element={<ActivitiesDemo />} />
        <Route path={`/foodtypes`} element={<FoodTypesDemo />} />
        <Route path={`/icons`} element={<IconsDemo />} />
      </Routes>
    </>
  );
}

export default App;
