import React, { useState, useEffect } from 'react';
import {
  View,
  Flex,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@aws-amplify/ui-react';
import {
  listActivitiesUtil,
  createActivitiesUtil,
  // updateActivitiesUtil,
  // deleteActivitiesUtil,
} from '../utils/requestActivities';
import { listUsersUtil, updateUsersUtil } from '../utils/requestUsers';

const ActivitiesCreate = (props) => {
  const [activities, setActivities] = useState([]);
  const [points, setPoints] = useState(0);

  // 2.1 show ZaifuPoint on screen
  useEffect(() => {
    (async () => {
      const initPoint = await getUserPoint(userInfo.user.username);
      setPoints(initPoint);
    })();
  }, []);

  // 1. get userId
  const userInfo = props;
  const userName = userInfo.user.username;

  // 2. get user ZaifuPoint by given userId
  const getUserPoint = async (userId) => {
    const userPoint = await listUsersUtil().then(
      (res) => res.find((user) => user.userId === userId).zaifuPoint
    );
    setPoints(userPoint);
    return userPoint;
  };

  // 3. get user category(walking - amount) VALUE from screen
  const getAmount = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const amt = form.get('amount');
    return amt;
  };

  // 4.  calculate ZaifuPoint by give VALUE
  // const calcZaifuPoint = (amount) => {
  //   const weight = 0.1;
  //   const zaifuPoint = Math.round(amount * weight);
  //   return zaifuPoint;
  // };

  // 5. update ZaifuPoint by given userID & diff point
  const updateUserPoint = async (userId, zaifuPoint) => {
    // get user
    const user = await listUsersUtil().then((res) =>
      res.find((user) => user.userId === userId)
    );
    // update user point
    user.zaifuPoint = zaifuPoint;
    // update user
    const newUsers = await updateUsersUtil(user);
    return newUsers;
  };

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
      userId: form.get('userId'),
      activityId: form.get('activityId'),
      amount: form.get('amount'),
    };
    await createActivitiesUtil(data);
    // setActivities(newActivities);
  };

  return (
    <>
      <h1>Create Activities</h1>
      <div>
        {/* 
        1. get userId
        2. get user ZaifuPoint by given userId
        2.1 show ZaifuPoint on screen
        3. get user category(walking - amount) VALUE from screen
        4.  calculate ZaifuPoint by give VALUE
        5. update ZaifuPoint by given userID & diff point
        6. calc ZaifuPoint diff (+ xxx point plused) and show on screen
        7. change SAVE button to BACK button 
        */}
      </div>
      <div>
        {/* <h2>Create Activity</h2> */}
        <View
          as="form"
          onSubmit={async (e) => {
            await createActivity(e);
            // console.log(activities);
            const tmpAmount = await getAmount(e);
            console.log(tmpAmount);
            updateUserPoint(userName);
          }}
        >
          <Flex direction="column" alignItems="left">
            <TextField
              name="userId"
              placeholder="XXXXX"
              label="userId"
              variation="default"
              required
            />
            <TextField
              name="activityId"
              placeholder="walk"
              label="activityId"
              variation="default"
              required
            />
            <TextField
              name="amount"
              placeholder="60"
              label="amount"
              variation="default"
              required
            />
          </Flex>
          <br />
          <Button type="submit" variation="primary">
            Create Activity
          </Button>
        </View>
        <div>
          ZaifuPoint: &nbsp; {points} <br></br>
          walking VALUE: &nbsp; <br></br>
          ZaifuPoint by VALUE: &nbsp;
        </div>
        <Button
          onClick={(e) => {
            console.log('e', e);
            // console.log("getUserPoint", getUserPoint('lalatoki'));
            console.log('getUserPoint', getUserPoint(userName));
            // console.log("------ amount ------", FormData(e.target).get('amount'));
            // console.log("------ amount", document.getElementsByName('amount').value);
          }}
        >
          test
        </Button>
      </div>

      <div>
        <h2>list Activity</h2>
        <Table caption="" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">userId</TableCell>
              <TableCell as="th">activityId</TableCell>
              <TableCell as="th">amount</TableCell>
              <TableCell as="th">createdAt</TableCell>
              <TableCell as="th">updatedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell key={activity.userId + 'userId'}>
                  {activity.userId}
                </TableCell>
                <TableCell key={activity.activityId + 'activityId'}>
                  {activity.activityId}
                </TableCell>
                <TableCell key={activity.amount + 'amount'}>
                  {activity.amount}
                </TableCell>
                <TableCell key={activity.createdAt + 'createdAt'}>
                  {activity.createdAt}
                </TableCell>
                <TableCell key={activity.updatedAt + 'updatedAt'}>
                  {activity.updatedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ActivitiesCreate;
