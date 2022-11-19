import { API } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import {
  createUsers as createUsersMutation,
  updateUsers as updateUsersMutation,
  deleteUsers as deleteUsersMutation,
} from "../graphql/mutations";

const listUsersUtil = async () => {
  const apiData = await API.graphql({ query: listUsers });
  const usersFromAPI = apiData.data.listUsers.items;
  return usersFromAPI;
};

const createUsersUtil = async ({ userId, height, weight, age, zaifuPoint }) => {
  const data = {
    userId: userId,
    height: height,
    weight: weight,
    age: age,
    zaifuPoint: zaifuPoint,
  };
  await API.graphql({
    query: createUsersMutation,
    variables: { input: data },
  });
  const newUsers = await listUsersUtil();
  return newUsers;
};

const updateUsersUtil = async (user) => {
  delete user.createdAt;
  delete user.updatedAt;
  await API.graphql({
    query: updateUsersMutation,
    variables: { input: user },
  });
  const newUsers = await listUsersUtil();
  return newUsers;
};

const deleteUsersUtil = async (id) => {
  await API.graphql({
    query: deleteUsersMutation,
    variables: { input: { id } },
  });
  const newUsers = await listUsersUtil();
  return newUsers;
};

export { listUsersUtil, createUsersUtil, updateUsersUtil, deleteUsersUtil };
