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
  const [showErrorModalFlag, setShowErrorModalFlag] = useState(false);
  const [showMenzaifuModalFlag, setShowMenzaifuModalFlag] = useState(false);
  const [modalFoodType, setModalFoodType] = useState({});
  const { windowWidth } = getWindowSize();
  const stringLimit = windowWidth / 80 > 6 ? windowWidth / 80 : 6; // 計算が面倒になってきたので、とりあえず…

  useEffect(() => {
    (async () => {
      const foodTypesList = await listFoodTypesUtil();
      setFoodTypes(foodTypesList);
      const loginUser = await getUser(userId);
      setUser(loginUser);
    })();
  }, []);

  const updateDbInfo = async () => {
    const loginUser = await getUser(userId);
    setUser(loginUser);
    const foodTypesList = await listFoodTypesUtil();
    setFoodTypes(foodTypesList);

    return { loginUser, foodTypesList };
  };

  const openErrorModal = () => {
    setShowConsumeModalFlag(false);
    setShowErrorModalFlag(true);
  };

  const openMenzaifuModal = () => {
    // setShowConsumeModalFlag(false);
    setShowMenzaifuModalFlag(true);
  };

  const consumePoint = async () => {
    const { loginUser: loginUser } = await updateDbInfo();
    if (loginUser.zaifuPoint < modalFoodType.minZaifuPoint) {
      openErrorModal();
    } else {
      const updateUser = { ...loginUser };
      updateUser.zaifuPoint -= modalFoodType.minZaifuPoint;
      await updateUsersUtil(updateUser);
      openMenzaifuModal();
    }
    await updateDbInfo();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '2px solid #999999',
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
                  : `${foodType.minZaifuPoint.toExponential(stringLimit)}pt～`}
              </Text>
            </Flex>
          </Flex>
        </Card>
      );
    }
  });

  return (
    <div className="foodtypes-wrapper">
      <Heading level={1}>罪なき飲食店</Heading>
      <Modal
        isOpen={showErrorModalFlag}
        ariaHideApp={false}
        onRequestClose={() => {
          setShowErrorModalFlag(false);
        }}
        style={customStyles}
        contentLabel="エラー表示"
      >
        <Heading level={2}>エラー</Heading>
        <Flex direction="column" className="modal-content-wrapper">
          <Text>ポイントが足りません…</Text>
          <Button
            loadingText=""
            onClick={() => {
              setShowErrorModalFlag(false);
            }}
            ariaLabel=""
            className="button-green"
          >
            😇OK
          </Button>
        </Flex>
      </Modal>
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
        <Flex direction="column" className="modal-content-wrapper">
          <Text>{modalFoodType.minZaifuPoint} ptを使って食べますか？</Text>
          <Button
            loadingText=""
            onClick={() => {
              setShowConsumeModalFlag(false);
            }}
            ariaLabel=""
            className="button-green"
          >
            🤐やめとく
          </Button>
          <Button
            loadingText=""
            onClick={() => {
              consumePoint();
              setShowConsumeModalFlag(false);
            }}
            ariaLabel=""
            className="button-yellow"
          >
            🍴たべる
          </Button>
        </Flex>
      </Modal>
      {/* 下記追加分 20111129_harada*/}
      <Modal
        isOpen={showMenzaifuModalFlag}
        ariaHideApp={false}
        onRequestClose={() => {
          setShowMenzaifuModalFlag(false);
        }}
        style={customStyles}
        contentLabel="免罪符付与"
      >
        <Heading level={2}>Not Guilty!!!</Heading>
        {/* <Heading level={2}>{modalFoodType.category}</Heading> */}
        <Flex direction="column" className="modal-content-wrapper">
          <Text>{modalFoodType.category} 獲得おめっとさん</Text>
          {/* <Button
            loadingText=""
            onClick={() => {
              setShowConsumeModalFlag(false);
            }}
            ariaLabel=""
            className="button-green"
          >
            🤐やめとく
          </Button>
          <Button
            loadingText=""
            onClick={() => {
              consumePoint();
              setShowConsumeModalFlag(false);
            }}
            ariaLabel=""
            className="button-yellow"
          >
            🍴たべる
          </Button> */}
        </Flex>
      </Modal>
      <ThemeProvider theme={reactCardTheme}>{foodTypesElm}</ThemeProvider>
    </div>
  );
}

FoodTypesList.propTypes = {
  userId: PropTypes.string.isRequired,
};
