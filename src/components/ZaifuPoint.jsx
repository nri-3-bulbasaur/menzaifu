import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { listUsersUtil } from '../utils/requestUsers';

const ZaifuPoint = ({ userId, updateUiToggle }) => {
  const [points, setPoints] = useState();

  useEffect(() => {
    (async () => {
      const initPoint = await getUserPoint(userId);
      setPoints(initPoint);
    })();
  }, [points, updateUiToggle]);

  const getUserPoint = async (userId) => {
    const userList = await listUsersUtil();
    const userPoint = userList.find(
      (user) => user.userId === userId
    ).zaifuPoint;
    if (userPoint) return userPoint;
    else return 0;
  };

  return <h2 className="point">Zaifu {points} pt</h2>;
};

ZaifuPoint.propTypes = {
  userId: PropTypes.string.isRequired,
  updateUiToggle: PropTypes.number.isRequired,
};

export default ZaifuPoint;
