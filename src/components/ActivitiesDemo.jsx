import React, { useState, useEffect } from "react";
import { View, Flex, TextField, Button, Table, TableHead, TableRow, TableBody, TableCell } from "@aws-amplify/ui-react";
import {
  listActivitiesUtil,
  createActivitiesUtil,
  updateActivitiesUtil,
  deleteActivitiesUtil,
} from "../utils/requestActivities";

const ActivitiesDemo = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    (async () => {
      const activitiesList = await listActivitiesUtil();
      setActivities(activitiesList);
    })();
  }, []);

  const createActivity = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      userId: form.get("userId"),
      activityId: form.get("activityId"),
      amount: form.get("amount"),
    };
    const newActivities = await createActivitiesUtil(data);
    setActivities(newActivities);
  };

  const updateActivity = async (foodType) => {
    const newActivities = await updateActivitiesUtil(foodType);
    setActivities(newActivities);
  };

  const deleteActivity = async (foodType) => {
    const newActivities = await deleteActivitiesUtil(foodType.id);
    setActivities(newActivities);
  };

  return (
    <>
      <h1>Activities Demo</h1>
      <div>
        <h2>Create Activity</h2>
        <View
          as="form"
          onSubmit={(e) => {
            createActivity(e);
          }}
        >
          <Flex direction="column" alignItems="left">
            <TextField name="userId" placeholder="XXXXX" label="userId" variation="default" required />
            <TextField name="activityId" placeholder="walk" label="activityId" variation="default" required />
            <TextField name="amount" placeholder="60" label="amount" variation="default" required />
          </Flex>
          <br />
          <Button type="submit" variation="primary">
            Create Activity
          </Button>
        </View>
      </div>
      <div>
        <h2>Delete Activity</h2>
        <Table caption="" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">userId</TableCell>
              <TableCell as="th">activityId</TableCell>
              <TableCell as="th">amount</TableCell>
              <TableCell as="th">createdAt</TableCell>
              <TableCell as="th">updatedAt</TableCell>
              <TableCell as="th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell key={activity.userId + "userId"}>{activity.userId}</TableCell>
                <TableCell key={activity.activityId + "activityId"}>{activity.activityId}</TableCell>
                <TableCell key={activity.amount + "amount"}>{activity.amount}</TableCell>
                <TableCell key={activity.createdAt + "createdAt"}>{activity.createdAt}</TableCell>
                <TableCell key={activity.updatedAt + "updatedAt"}>{activity.updatedAt}</TableCell>
                <TableCell key={activity.id + "delete"}>
                  <Button key={activity.id + "deleteButton"} onClick={() => deleteActivity(activity)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2>Update Activity</h2>
        <Table caption="" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">userId</TableCell>
              <TableCell as="th">activityId</TableCell>
              <TableCell as="th">amount</TableCell>
              <TableCell as="th">createdAt</TableCell>
              <TableCell as="th">updatedAt</TableCell>
              <TableCell as="th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id + "update"}>
                <TableCell key={activity.userId + "userIdUpdate"}>{activity.userId}</TableCell>
                <TableCell key={activity.activityId + "activityIdUpdate"}>{activity.activityId}</TableCell>
                <TableCell key={activity.amount + "amountUpdate"}>{activity.amount}</TableCell>
                <TableCell key={activity.createdAt + "createdAtUpdate"}>{activity.createdAt}</TableCell>
                <TableCell key={activity.updatedAt + "updatedAtUpdate"}>{activity.updatedAt}</TableCell>
                <TableCell key={activity.id + "update"}>
                  <Button key={activity.id + "updateButton"} onClick={() => updateActivity(activity)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ActivitiesDemo;
