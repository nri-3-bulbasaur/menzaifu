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
import { reactCardTheme, badgeClassNameList, modalStyle } from './Common';
import { listFoodTypesUtil } from '../utils/requestFoodTypes';
import { getUser, updateUsersUtil } from '../utils/requestUsers';
import getWindowSize from '../utils/getWindowSize';
import Modal from 'react-modal';

export default function FoodTypesList({ userId }) {
  const [updateUiToggle, setUpdateUiToggle] = useState(0);
  const [foodTypes, setFoodTypes] = useState();
  const [showConsumeModalFlag, setShowConsumeModalFlag] = useState(false);
  const [showErrorModalFlag, setShowErrorModalFlag] = useState(false);
  const [modalFoodType, setModalFoodType] = useState({});
  const { windowWidth } = getWindowSize();
  const stringLimit = windowWidth / 80 > 6 ? windowWidth / 80 : 6; // 計算が面倒になってきたので、とりあえず…

  useEffect(() => {
    (async () => {
      await getLatestFoodTypes();
    })();
  }, [updateUiToggle]);

  const getLatestFoodTypes = async () => {
    let latestFoodTypes = await listFoodTypesUtil();
    const latestUser = await getUser(userId);
    latestFoodTypes = latestFoodTypes.filter(
      (foodType) => latestUser.zaifuPoint >= foodType.minZaifuPoint
    );
    setFoodTypes(latestFoodTypes);

    return latestFoodTypes;
  };

  const openErrorModal = () => {
    setShowConsumeModalFlag(false);
    setShowErrorModalFlag(true);
  };

  const consumePoint = async () => {
    const latestUser = await getUser(userId);
    if (latestUser.zaifuPoint < modalFoodType.minZaifuPoint) {
      openErrorModal();
    } else {
      const updateUser = { ...latestUser };
      updateUser.zaifuPoint -= modalFoodType.minZaifuPoint;
      await updateUsersUtil(updateUser);
    }
    setUpdateUiToggle(Math.random());
  };

  const getCardElement = (foodType) => {
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
  };

  return (
    <div className="foodtypes-wrapper">
      <Heading level={1}>罪なき飲食店</Heading>
      <Modal
        isOpen={showErrorModalFlag}
        ariaHideApp={false}
        onRequestClose={() => {
          setShowErrorModalFlag(false);
        }}
        style={modalStyle}
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
        style={modalStyle}
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
      <ThemeProvider theme={reactCardTheme}>
        {!foodTypes ? (
          <Text>🕛 Now Loading... 🕧</Text>
        ) : foodTypes.length > 0 ? (
          foodTypes.map((foodType) => {
            return getCardElement(foodType);
          })
        ) : (
          <Text>
            飲食可能なお店が見つかりませんでした。
            <br />
            動いた後の食事は美味しいですよ！🚶‍♂️
          </Text>
        )}
      </ThemeProvider>
    </div>
  );
}

FoodTypesList.propTypes = {
  userId: PropTypes.string.isRequired,
};
