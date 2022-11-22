import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';

const Settings = (authInfo) => {
  return (
    <>
      <h2>設定</h2>
      <Link to="/">
        <Button backgroundColor={`#1abc9c`}>メイン画面に戻る</Button>
      </Link>
      <Button backgroundColor={`#c31789`} onClick={authInfo.signOut}>
        ログアウト
      </Button>
    </>
  );
};

export default Settings;
