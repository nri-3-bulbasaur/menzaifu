// React
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Amplify
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Components
import FoodTypesList from './components/FoodTypesList';
import NotFound from './components/NotFound';

Amplify.configure(awsExports);

// lint err function App(signOut, user) {
function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Authenticator socialProviders={['google']}>
            {({ signOut, user }) => (
              <main>
                <Link to="/">
                  <h1>Hello</h1>
                </Link>
                <button onClick={signOut}>Sign out</button>
                <Routes>
                  <Route
                    path={`/`}
                    element={<FoodTypesList userId={user.username} />}
                  />
                  <Route
                    path={`/foodtypes`}
                    element={<FoodTypesList userId={user.username} />}
                  />
                  <Route path={`*`} element={<NotFound />} />
                </Routes>
              </main>
            )}
          </Authenticator>
        </header>
      </div>
    </>
  );
}

export default App;
