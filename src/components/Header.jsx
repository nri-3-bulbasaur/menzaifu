import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { Flex, Image } from '@aws-amplify/ui-react';
import '../assets/header.css';
import TitleIcon from '../assets/menzaifu-title.png';

const Header = (authInfo) => {
  return (
    <>
      <Flex
        className="header"
        justifyContent="space-between"
        alignItems="center"
      >
        <div></div>
        <Image
          alignSelf="center"
          src={TitleIcon}
          alt="title"
          maxWidth="25vw"
          maxHeight="7vh"
        />
        {/* TODO: 現状は設定画面に機能がないため、ログアウトボタンを設置している。
                  設定画面内に新たな機能が実装された後にコメントアウトを解除する */}
        {/* <Link className="setting-button" to="/settings">
          <IoMdSettings size={`5vh`} color={`#383838`} />
        </Link> */}
        <IoIosLogOut
          size={`4vh`}
          color={`#383838`}
          onClick={authInfo.signOut}
        />
      </Flex>
    </>
  );
};

export default Header;
