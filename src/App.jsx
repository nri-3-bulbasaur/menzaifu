// React
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Amplify
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Components
import FoodTypesList from './components/FoodTypesList';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Settings from './components/Settings';

Amplify.configure(awsExports);

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Authenticator socialProviders={['google']}>
            {({ signOut, user }) => (
              <main>
                <Header />
                <Routes>
                  <Route path={`/`} element={<FoodTypesList />} />
                  <Route path={`/foodtypes`} element={<FoodTypesList />} />
                  <Route
                    path={`/settings`}
                    element={<Settings authInfo={user} signOut={signOut} />}
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
