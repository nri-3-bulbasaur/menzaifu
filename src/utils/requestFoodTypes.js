import { API } from 'aws-amplify';
import { listFoodTypes } from '../graphql/queries';
import {
  createFoodTypes as createFoodTypesMutation,
  updateFoodTypes as updateFoodTypesMutation,
  deleteFoodTypes as deleteFoodTypesMutation,
} from '../graphql/mutations';
import { Storage } from 'aws-amplify';

const getImageFromS3 = async (foodTypes) => {
  const newFoodTypesPromise = await foodTypes.map(async (foodType) => {
    try {
      let newFoodType = { ...foodType };
      newFoodType = formatFoodType(newFoodType);
      const s3Image = await Storage.get(foodType.image, { download: true });
      const url = await URL.createObjectURL(s3Image.Body);
      newFoodType.url = url;
      return newFoodType;
    } catch (err) {
      console.error(err);
      try {
        // 該当する画像が無い場合には、デフォ画像を表示する
        let newFoodType = { ...foodType };
        newFoodType = formatFoodType(newFoodType);
        const s3Image = await Storage.get('foodtypes/menzaifu_300_300.png', {
          download: true,
        });
        const url = await URL.createObjectURL(s3Image.Body);
        newFoodType.url = url;
        return newFoodType;
      } catch {
        let newFoodType = { ...foodType };
        newFoodType = formatFoodType(newFoodType);
        newFoodType.url = 'not found';
        return newFoodType;
      }
    }
  });
  const newFoodTypes = await Promise.all(newFoodTypesPromise).then((res) => {
    return res.map((elem) => elem);
  });
  return newFoodTypes;
};

/* eslint-disable no-control-regex */
const formatFoodType = (foodType) => {
  const newFoodType = { ...foodType };

  if ('image' in newFoodType && typeof newFoodType.image === 'string') {
    newFoodType.image = newFoodType.image
      .replace(
        /[\s\r\n\u0000-\u001F\u007F-\u009F\u200E\u200F\u202A-\u202E]/g,
        ''
      )
      .replace(/(^javascript:|^)/, '');
  }

  if ('type' in newFoodType && typeof newFoodType.type === 'string') {
    newFoodType.type = newFoodType.type
      .replace(/[\r\n\u0000-\u001F\u007F-\u009F\u200E\u200F\u202A-\u202E]/g, '')
      .replace(/[\s]/g, ' ')
      .replace(/(^\s*javascript:|^)/, '')
      .trim();
  }

  if ('category' in newFoodType && typeof newFoodType.category === 'string') {
    newFoodType.category = newFoodType.category
      .replace(/[\r\n\u0000-\u001F\u007F-\u009F\u200E\u200F\u202A-\u202E]/g, '')
      .replace(/[\s]/g, ' ')
      .replace(/(^\s*javascript:|^)/, '')
      .trim();
  }

  return newFoodType;
};
/* eslint-enable no-control-regex */

const listFoodTypesUtil = async () => {
  const apiData = await API.graphql({ query: listFoodTypes });
  const foodTypesFromAPI = apiData.data.listFoodTypes.items;
  const foodTypes = await getImageFromS3(foodTypesFromAPI);
  //console.log(foodTypes);
  return foodTypes;
};

const createFoodTypesUtil = async ({
  type,
  category,
  minZaifuPoint,
  image,
}) => {
  const data = {
    type: type,
    category: category,
    minZaifuPoint: minZaifuPoint,
    image: image,
  };
  await API.graphql({
    query: createFoodTypesMutation,
    variables: { input: data },
  });
  const newFoodTypes = await listFoodTypesUtil();
  return newFoodTypes;
};

const updateFoodTypesUtil = async (foodType) => {
  delete foodType.createdAt;
  delete foodType.updatedAt;
  delete foodType.url;
  await API.graphql({
    query: updateFoodTypesMutation,
    variables: { input: foodType },
  });
  const newFoodTypes = await listFoodTypesUtil();
  return newFoodTypes;
};

const deleteFoodTypesUtil = async (id) => {
  await API.graphql({
    query: deleteFoodTypesMutation,
    variables: { input: { id } },
  });
  const newFoodTypes = await listFoodTypesUtil();
  return newFoodTypes;
};

export {
  listFoodTypesUtil,
  createFoodTypesUtil,
  updateFoodTypesUtil,
  deleteFoodTypesUtil,
};
