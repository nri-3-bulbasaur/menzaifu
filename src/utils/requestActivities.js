import { API } from "aws-amplify";
import { listActivities } from "../graphql/queries";
import {
  createActivities as createActivitiesMutation,
  updateActivities as updateActivitiesMutation,
  deleteActivities as deleteActivitiesMutation,
} from "../graphql/mutations";

const listActivitiesUtil = async () => {
  const apiData = await API.graphql({ query: listActivities });
  const activitiesFromAPI = apiData.data.listActivities.items;
  return activitiesFromAPI;
};

const createActivitiesUtil = async ({ userId, activityId, amount }) => {
  const data = {
    activityId: activityId,
    amount: amount,
    userId: userId,
  };
  await API.graphql({
    query: createActivitiesMutation,
    variables: { input: data },
  });
  const newActivities = await listActivitiesUtil();
  return newActivities;
};

const updateActivitiesUtil = async (activity) => {
  delete activity.createdAt;
  delete activity.updatedAt;
  await API.graphql({
    query: updateActivitiesMutation,
    variables: { input: activity },
  });
  const newActivities = await listActivitiesUtil();
  return newActivities;
};

const deleteActivitiesUtil = async (id) => {
  await API.graphql({
    query: deleteActivitiesMutation,
    variables: { input: { id } },
  });
  const newActivities = await listActivitiesUtil();
  return newActivities;
};

export { listActivitiesUtil, createActivitiesUtil, updateActivitiesUtil, deleteActivitiesUtil };
