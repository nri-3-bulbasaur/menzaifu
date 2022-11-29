import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { listUsersUtil } from '../utils/requestUsers';

const Menzaifu = ({userId, updateUiToggle}) => {
  const [menzaifuNum, setMenzaifuNum] = useState(0);

  useEffect(() => {
    (async () => {
      const initMenzaifu = await getMenzaifu(userId);
      setMenzaifuNum(initMenzaifu);
    })();
  }, [menzaifuNum, updateUiToggle]);

  const getMenzaifu = async (userId) =>  {
    const userList = await listUsersUtil();
    const menzaifu = userList.find(user => user.userId === userId).menzaifu;
    if (menzaifu) return menzaifu;
    else return 0;
  };

  return (
    <h2 className='point'>免罪符 {menzaifuNum} 枚 獲得中！！</h2>
  );
};

Menzaifu.propTypes = {
  userId: PropTypes.string.isRequired,
  updateUiToggle: PropTypes.number.isRequired,
};

export default Menzaifu;
