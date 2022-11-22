import React, { useState, useEffect } from 'react';

import {
  ThemeProvider,
  Heading,
  Card,
  Flex,
  Image,
  Badge,
  Text,
} from '@aws-amplify/ui-react';

import '../assets/styles.css';
import { reactCardTheme, badgeClassNameList } from './Common';
import { listFoodTypesUtil } from '../utils/requestFoodTypes';
import getWindowSize from '../utils/getWindowSize';

export default function FoodTypesList() {
  const [foodTypes, setFoodTypes] = useState([]);
  const { windowWidth } = getWindowSize();
  const stringLimit = windowWidth / 80 > 6 ? windowWidth / 80 : 6; // 計算が面倒になってきたので、とりあえず…

  useEffect(() => {
    (async () => {
      const foodTypesList = await listFoodTypesUtil();
      setFoodTypes(foodTypesList);
    })();
  }, []);

  const foodTypesElm = foodTypes.map((foodType) => {
    if (foodType.minZaifuPoint > 0) {
      return (
        <Card key={foodType.id}>
          <Flex alignItems="flex-start">
            <Image src={foodType.url} alt="hoge" maxWidth="25vw" />
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
      <ThemeProvider theme={reactCardTheme}>{foodTypesElm}</ThemeProvider>
    </>
  );
}
