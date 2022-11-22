import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  Heading,
  Card,
  Flex,
  Image,
  Badge,
  Text,
  Button,
} from '@aws-amplify/ui-react';

import '../assets/styles.css';
import { reactCardTheme, badgeClassNameList } from './Common';
import { listFoodTypesUtil } from '../utils/requestFoodTypes';
import { getUser, updateUsersUtil } from '../utils/requestUsers';
import getWindowSize from '../utils/getWindowSize';
import Modal from 'react-modal';

export default function FoodTypesList({ userId }) {
  const [user, setUser] = useState({});
  const [foodTypes, setFoodTypes] = useState([]);
  const [showConsumeModalFlag, setShowConsumeModalFlag] = useState(false);
  const [modalFoodType, setModalFoodType] = useState({});
  const { windowWidth } = getWindowSize();
  const stringLimit = windowWidth / 80 > 6 ? windowWidth / 80 : 6; // 計算が面倒になってきたので、とりあえず…

  useEffect(() => {
    (async () => {
      const foodTypesList = await listFoodTypesUtil();
      setFoodTypes(foodTypesList);
      console.log('userId:' + userId);
      const loginUser = await getUser(userId);
      setUser(loginUser);
    })();
  }, []);

  const consumePoint = async () => {
    const updateUser = { ...user };
    updateUser.zaifuPoint -= modalFoodType.minZaifuPoint;
    updateUsersUtil(updateUser);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const foodTypesElm = foodTypes.map((foodType) => {
    if (user.zaifuPoint >= foodType.minZaifuPoint) {
      return (
        <Card
          key={foodType.id}
          onClick={() => {
            setModalFoodType(foodType);
            setShowConsumeModalFlag(true);
          }}
        >
          <Flex alignItems="flex-start">
            <Image src={foodType.url} alt={foodType.category} maxWidth="25vw" />
            <Flex direction="column" gap="xxxs">
              <Flex>
                <Badge
                  className={`type-text ${
                    foodType.type in badgeClassNameList
                      ? badgeClassNameList[foodType.type]
                      : 'badge-default'
                  }`}
                >
                  {foodType.type.length < stringLimit
                    ? foodType.type
                    : `${foodType.type.substring(0, stringLimit)}...`}
                </Badge>
              </Flex>
              <Text className="category-text">
                {foodType.category.length < stringLimit
                  ? foodType.category
                  : `${foodType.category.substring(0, stringLimit)}...`}
              </Text>
              <Text className="point-text">
                {foodType.minZaifuPoint.toString().toLocaleString().length <
                stringLimit
                  ? `${foodType.minZaifuPoint.toLocaleString()}pt～`
                  : `${foodType.minZaifuPoin.toExponential(stringLimit)}pt～`}
              </Text>
            </Flex>
          </Flex>
        </Card>
      );
    }
  });

  return (
    <>
      <Heading level={1}>罪なき飲食店</Heading>
      <Modal
        isOpen={showConsumeModalFlag}
        ariaHideApp={false}
        onRequestClose={() => {
          setShowConsumeModalFlag(false);
        }}
        style={customStyles}
        contentLabel="ポイント消費確認"
      >
        <Heading level={2}>{modalFoodType.category}</Heading>
        <Text>{modalFoodType.minZaifuPoint} ptを使って食べますか？</Text>
        <Button
          loadingText=""
          onClick={() => {
            setShowConsumeModalFlag(false);
          }}
          ariaLabel=""
        >
          やめとく
        </Button>
        <Button
          loadingText=""
          onClick={() => {
            consumePoint();
            setShowConsumeModalFlag(false);
          }}
          ariaLabel=""
        >
          たべる
        </Button>
      </Modal>
      <ThemeProvider theme={reactCardTheme}>{foodTypesElm}</ThemeProvider>
    </>
  );
}

FoodTypesList.propTypes = {
  userId: PropTypes.string.isRequired,
};
