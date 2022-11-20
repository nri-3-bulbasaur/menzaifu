import { API } from "aws-amplify";
import { listFoodTypes } from "../graphql/queries";
import {
  createFoodTypes as createFoodTypesMutation,
  updateFoodTypes as updateFoodTypesMutation,
  deleteFoodTypes as deleteFoodTypesMutation,
} from "../graphql/mutations";

const listFoodTypesUtil = async () => {
  const apiData = await API.graphql({ query: listFoodTypes });
  const foodTypesFromAPI = apiData.data.listFoodTypes.items;
  return foodTypesFromAPI;
};

const createFoodTypesUtil = async ({ type, category, minZaifuPoint, image }) => {
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
  const newFoodTypes = await listFoodTypes();
  return newFoodTypes;
};

export { listFoodTypesUtil, createFoodTypesUtil, updateFoodTypesUtil, deleteFoodTypesUtil };
