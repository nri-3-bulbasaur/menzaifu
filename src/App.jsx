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

//Check if you are in localhost or production
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

const signInURI = awsExports.oauth.redirectSignIn.split(',')
const signOutURI = awsExports.oauth.redirectSignOut.split(',')

if (isLocalhost) {
  awsExports.oauth.redirectSignIn = signInURI[1]
  awsExports.oauth.redirectSignOut = signOutURI[1]
} else if (window.location.hostname === 
  // Add Your Application Domain here. For Example:
  "https://staging.d4mynp1yvqb1q.amplifyapp.com/"
) {
  awsExports.oauth.redirectSignIn = signInURI[2]
  awsExports.oauth.redirectSignOut = signOutURI[2]
} else {
  console.alert('This is not possible')
}

//Then Configure Resources
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
                  <Route path={`/`} element={<FoodTypesList userId={user.username} />} />
                  <Route path={`/foodtypes`} element={<FoodTypesList userId={user.username} />} />
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
