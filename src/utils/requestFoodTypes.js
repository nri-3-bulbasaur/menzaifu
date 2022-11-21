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
      const s3Image = await Storage.get(foodType.image, { download: true });
      const url = await URL.createObjectURL(s3Image.Body);
      const newFoodType = { ...foodType };
      newFoodType.url = url;
      return newFoodType;
    } catch (err) {
      console.log(err);
      const newFoodType = { ...foodType };
      newFoodType.url = 'not found';
      return newFoodType;
    }
  });
  const newFoodTypes = await Promise.all(newFoodTypesPromise).then((res) => {
    return res.map((elem) => elem);
  });
  return newFoodTypes;
};

const listFoodTypesUtil = async () => {
  const apiData = await API.graphql({ query: listFoodTypes });
  const foodTypesFromAPI = apiData.data.listFoodTypes.items;
  const foodTypes = await getImageFromS3(foodTypesFromAPI);
  console.log(foodTypes);
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
