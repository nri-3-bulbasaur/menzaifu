import React, { useState, useEffect } from 'react';

import { View, Flex } from '@aws-amplify/ui-react';

import { listFoodTypesUtil } from '../utils/requestFoodTypes';

export default function FoodTypesList() {
  const [foodTypes, setFoodTypes] = useState([]);

  useEffect(() => {
    (async () => {
      const foodTypesList = await listFoodTypesUtil();
      setFoodTypes(foodTypesList);
    })();
  }, []);

  return (
    <>
      {foodTypes.map((foodType) => {
        console.log('foodType: ' + foodType);
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          alignContent="flex-start"
          wrap="nowrap"
          gap="1rem"
        >
          <View as="div" ariaLabel="photo">
            {foodType.image}
          </View>
          <View as="div" ariaLabel="description">
            <View as="span" ariaLabel="type">
              {foodType.type}
            </View>
            <View as="span" ariaLabel="category">
              {foodType.category}
            </View>
            <View as="span" ariaLabel="point">
              {foodType.minZaifuPoint}
            </View>
          </View>
        </Flex>;
      })}
    </>
  );
}
