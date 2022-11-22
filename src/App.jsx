// React
import React from 'react';
// import React, { useState }  from 'react';
// Amplify
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Components
// import UsersDemo from './components/UsersDemo';
// import FoodTypesDemo from './components/FoodTypesDemo';
// import ActivitiesDemo from './components/ActivitiesDemo';
import ActivitiesCreate from './components/ActivitiesCreate';

Amplify.configure(awsExports);

// lint err function App(signOut, user) {
function App() {
  // const [userName, setUserName] = useState(user.username);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Authenticator socialProviders={['google']}>
            {({ signOut, user }) => (

              <main>
                <h1>Hello {user.username}</h1>
                <button onClick={signOut}>Sign out</button>
                {/* <UsersDemo /> */}
                {/* <FoodTypesDemo />
                <ActivitiesDemo /> */}
                <ActivitiesCreate 
                  user = { user } />
              </main>
            )}
          </Authenticator>
        </header>
      </div>
    </>
  );
}

export default App;
