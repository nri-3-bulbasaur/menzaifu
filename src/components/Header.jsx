import React from 'react';

const Header = (cognitoUser) => {
  // メモのために一時残しておく
  // const identities = JSON.parse(cognitoUser.user.attributes.identities)[0];
  // const userName = cognitoUser.user.username;
  // const email = cognitoUser.user.attributes.email;

  return (
    <>
      <h1> This is Header</h1>
      <button onClick={cognitoUser.signOut}>ログアウト</button>
    </>
  );
};

export default Header;
