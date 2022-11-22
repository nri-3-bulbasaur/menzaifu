import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { Flex, Image } from '@aws-amplify/ui-react';
import '../assets/header.css';
import TitleIcon from '../assets/menzaifu-title.png';

const Header = () => {
  return (
    <>
      <div className="header">
        <Flex justifyContent="flex-end" alignItems="flex-end">
          <Image
            alignSelf="center"
            src={TitleIcon}
            alt="title"
            maxWidth="25vw"
          />
          <Link className="setting-button" to="/settings">
            <IoMdSettings size={50} color={`#383838`} />
          </Link>
        </Flex>
      </div>
    </>
  );
};

export default Header;
